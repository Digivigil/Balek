import { describe, expect, test } from "@jest/globals";

import { Files } from "../../src/Instance/IO/Files";

// @ts-ignore
import * as packageInfoImport from "../../package.json" assert { type: "json" };

const files = new Files();
const packageInfo: any = packageInfoImport.default;

describe("Testing Files IO Class", () => {
  test("Files Class isReady resolves", async () => {
    await expect(files.isReady()).resolves.toBe(false);
  });

  test("Files Class Returns file: package.json", async () => {
    return files
      .returnFile("./package.json")
      .then((packageData) => {
        const parsedData = JSON.parse(packageData.toString());
        expect(JSON.stringify(parsedData).toString()).toMatch(
          JSON.stringify(packageInfo).toString()
        );
      })
      .catch((Error) => {
        expect(Error).toBe(false);
      });
  });

  test("Files Class Throws error on unavailable file", async () => {
    await expect(files.returnFile("./thisIsNotAFile")).rejects.toThrow();
  });

  test("Files Class Returns a Readable File Handle for package.json", async () => {
    return files
      .returnFileHandle("./package.json")
      .then(async (fileHandle) => {
        let stat = await fileHandle.stat();
        await fileHandle.close();
        expect(stat.size).toBeGreaterThan(1);
      })
      .catch((Error) => {
        expect(Error).toBe(false);
      });
  });

  test("Files Class Throws error on unavailable file handle", async () => {
    await expect(files.returnFileHandle("./thisIsNotAFile")).rejects.toThrow();
  });
});
