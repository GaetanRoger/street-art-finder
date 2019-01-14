import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';

export class StorageHelpers {
  static readonly PIECE_IMAGE_REGEX = /artists\/[A-Za-z0-9]+\/pieces\/([A-Za-z0-9]+)\//;

  static isAPieceImage(filepath: string): boolean {
    return this.PIECE_IMAGE_REGEX.test(filepath);
  }

  static getPieceId(pieceImageFilePath: string): string {
    const result = this.PIECE_IMAGE_REGEX.exec(pieceImageFilePath);
    return result ? result[1] : undefined;
  }

  static getTempDirName(subdir?: string): string {
    return subdir
      ? path.join(os.tmpdir(), subdir)
      : os.tmpdir();
  }

  static async makeTempDir(subdir: string): Promise<string> {
    const tempDir = StorageHelpers.getTempDirName(subdir);
    await fs.ensureDir(tempDir);

    return tempDir;
  }

  static replaceNameInPath(pathWithName: string, newName: string): string {
    return path.join(path.dirname(pathWithName), newName);
  }
}
