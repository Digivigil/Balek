import { describe, expect, test } from "@jest/globals";
import { IO } from "../src/Instance/IO";

const ioTest = new IO();

describe("Testing  IO Class", () => {
  test("IO Class isReady resolves", async () => {
    await expect(ioTest.isReady()).resolves.toBe(true);
  });
});
