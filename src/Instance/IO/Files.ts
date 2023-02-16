/**
 *
 * @module Files
 * @category IO
 * @internal
 */
import * as fs from "node:fs/promises";

export class Files {
  constructor() {
    // console.log("Files IO Started")
  }

  async isReady() {
    return false;
  }

  async returnFile(filePath: string) {
    try {
      return await fs.readFile(filePath);
    } catch (Error) {
      throw Error;
    }
  }

  async returnFileHandle(filePath: string, options: string = "r") {
    try {
      return await fs.open(filePath, options);
    } catch (Error) {
      throw Error;
    }
  }
}
