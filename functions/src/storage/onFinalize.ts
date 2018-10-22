import * as path from 'path';
import * as fs from 'fs-extra';
import * as functions from 'firebase-functions';
import {StorageHelpers} from './storage-helpers';
import {ImageData} from './ImageData';
import {ObjectMetadata} from 'firebase-functions/lib/providers/storage';


const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();


export async function storageOnFinalize(object: ObjectMetadata) {
    const image = new ImageData(object);

    if (image.isMarkedAsProcessed()) {
        console.log(`File ${image.fileName} already processed; exiting function.`);
        return false;
    }

    if (StorageHelpers.isAPieceImage(image.filePath)) {
        return await compressPieceImage(image);
    }


    console.log(`File ${image.fileName} does not meet any criteria; existing function.`);
    return null;
}

async function compressPieceImage(image: ImageData) {
    if (functions.config().tinify.enabled === 'false') {
        console.log('Tinify en var is not enabled; not compressing anything.');
        return null;
    }

    const bucket = image.getBucket(gcs);
    const inputDir = StorageHelpers.tempDir('input');
    const outputDir = StorageHelpers.tempDir('output');
    const tempInputFilePath = path.join(inputDir, image.fileName);
    const tempOutputFilePath = path.join(outputDir, image.fileName);

    await fs.ensureDir(inputDir);
    await fs.ensureDir(outputDir);

    // Download files locally
    await bucket.file(image.filePath).download({destination: tempInputFilePath});

    // Optimize image
    await StorageHelpers.compressImage(tempInputFilePath, tempOutputFilePath);

    image.addProcessedMetadata();
    const newFilePath = path.join(path.dirname(image.filePath), image.fileName);
    const uploadOptions = {destination: newFilePath, metadata: image.metadata};

    return await bucket.upload(tempOutputFilePath, uploadOptions);
}
