import { describe, expect, test } from "@jest/globals";

import { Https } from "../../src/Instance/IO/Https";

const https = new Https();

describe("Testing  IO Https Class", () => {
  test("Https Class isReady resolves", async () => {
    await expect(https.isReady()).resolves.toBe(true);
  });
});
