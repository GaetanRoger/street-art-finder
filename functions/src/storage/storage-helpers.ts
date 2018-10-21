import * as os from 'os';
import * as path from 'path';

const tinify = require('tinify');

export class StorageHelpers {
    static readonly PROCESSED_PREFIX = 'processed@';
    static readonly PIECE_IMAGE_REGEX = /artists\/[A-Za-z0-9]+\/pieces\/([A-Za-z0-9]+)\//g;

    static isAPieceImage(filepath: string): boolean {
        return this.PIECE_IMAGE_REGEX.test(filepath);
    }

    static getPieceId(pieceImageFilePath: string): string {
        const result = this.PIECE_IMAGE_REGEX.exec(pieceImageFilePath);
        return result ? result[1] : undefined;
    }

    static markAsProcessed(filename: string): string {
        return this.PROCESSED_PREFIX + filename;
    }

    static isMarkedAsProcessed(filename: string): boolean {
        return filename.includes(StorageHelpers.PROCESSED_PREFIX);
    }

    static tempDir(subdir?: string): string {
        return subdir
            ? path.join(os.tmpdir(), subdir)
            : os.tmpdir();
    }

    static compressImage(inputPath: string, outputPath: string): Promise<void> {
        const source = tinify.fromFile(inputPath);
        return source.toFile(outputPath);
    }
}