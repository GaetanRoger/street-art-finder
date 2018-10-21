import * as path from 'path';
import {Bucket} from '@google-cloud/storage';
import Storage = require('@google-cloud/storage');
import {ObjectMetadata} from 'firebase-functions/lib/providers/storage';

export class ImageData {
    bucketName: string;
    filePath: string;
    fileName: string;
    contentType: string;
    metadata: any;

    constructor(inputImage: ObjectMetadata) {
        this.bucketName = inputImage.bucket;
        this.filePath = inputImage.name;
        this.fileName = path.basename(inputImage.name);
        this.contentType = inputImage.contentType;
        this.metadata = {contentType: this.contentType, metadata: inputImage.metadata};
    }

    getBucket(storage: Storage): Bucket {
        return storage.bucket(this.bucketName);
    }

    isMarkedAsProcessed(): boolean {
        return this.metadata.metadata && this.metadata.metadata.processed === 'true';
    }

    addProcessedMetadata() {
        this.metadata.metadata = this.metadata.metadata
            ? {...this.metadata.metadata, processed: true}
            : {processed: true};
    }
}