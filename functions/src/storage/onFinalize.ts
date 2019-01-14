import * as path from 'path';
import * as fs from 'fs-extra';
import {StorageHelpers} from './storage-helpers';
import {ImageData} from './ImageData';
import {ObjectMetadata} from 'firebase-functions/lib/providers/storage';
import * as admin from 'firebase-admin';

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');


const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();


export async function storageOnFinalize(object: ObjectMetadata) {
  const image = new ImageData(object);
  const pieceId = StorageHelpers.getPieceId(image.filePath);

  if (image.isMarkedAsProcessed()) {
    console.log(`File ${image.fileName} already processed; exiting function.`);
    return false;
  }

  if (StorageHelpers.isAPieceImage(image.filePath)) {
    return await compressPieceImageAndUpdateFirestoreEntry(image, pieceId);
  }

  console.log(`File ${image.filePath} does not meet any criteria; existing function.`);
  return null;
}

async function compressToWebpAndUpload(
  tempInputFilePath: string,
  image: ImageData,
  bucket,
  quality: number
): Promise<string> {
  // Temp dir making
  const outputDir = await StorageHelpers.makeTempDir(`output-${quality}`);

  // Compression
  const results = await compressToWebp(tempInputFilePath, outputDir, quality);

  // Renaming and upload preps
  const newFilePath = StorageHelpers.replaceNameInPath(image.filePath, `img-${quality}.webp`);
  const uploadOptions = {destination: newFilePath, metadata: image.metadata};

  // Upload
  await bucket.upload(results[0].path, uploadOptions);
  return newFilePath;
}

async function compressPieceImageAndUpdateFirestoreEntry(image: ImageData, pieceId: string) {
  const filePaths = await compressPieceImageAndUploadItToStorage(image);
  const pieceDoc = admin.firestore().collection('pieces').doc(pieceId);

  return admin.firestore().runTransaction(async t => {
    const piece = await t.get(pieceDoc);
    const bucket = admin.storage().bucket();

    const downloadConfig = {
      action: 'read',
      expires: '03-09-2491'
    };

    const lowDownloadUrl = await bucket.file(filePaths.low).getSignedUrl(downloadConfig as any);
    const normalDownloadUrl = await bucket.file(filePaths.normal).getSignedUrl(downloadConfig as any);

    return await t.update(piece.ref, {
      images: {
        main: {
          low: lowDownloadUrl[0],
          normal: normalDownloadUrl[0]
        },
        others: piece.data().images.others
      }
    });
  });

}

async function compressPieceImageAndUploadItToStorage(image: ImageData): Promise<{ low: string, normal: string }> {
  const bucket = image.getBucket(gcs);
  const inputDir = StorageHelpers.getTempDirName('input');
  const tempInputFilePath = path.join(inputDir, image.fileName);

  await fs.ensureDir(inputDir);

  // Download files locally
  await bucket.file(image.filePath).download({destination: tempInputFilePath});

  image.addProcessedMetadata();

  return {
    low: await compressToWebpAndUpload(tempInputFilePath, image, bucket, 20),
    normal: await compressToWebpAndUpload(tempInputFilePath, image, bucket, 80)
  };
}

async function compressToWebp(inpuFilePath: string, outputDirPath: string, quality: number) {
  return await imagemin([inpuFilePath], outputDirPath, {
    use: [
      imageminWebp({quality})
    ]
  });
}
