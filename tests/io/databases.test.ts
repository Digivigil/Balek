import { describe, expect, test } from "@jest/globals";
import { Databases } from "../../src/Instance/IO/Databases";

const databases = new Databases();

describe("Testing  IO Databases Class", () => {
  test("Databases Class isReady resolves", async () => {
    await expect(databases.isReady()).resolves.toBe(false);
  });
});
