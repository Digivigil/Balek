import { describe, expect, test } from "@jest/globals";
import { MongoDatabaseConnection } from "../../../src/Instance/IO/Databases/Mongo";

const mongoDatabaseConnection = new MongoDatabaseConnection();

describe("IO MongoDatabaseConnection Class", () => {
  test("MongoDatabaseConnection Class isReady", async () => {
    await expect(mongoDatabaseConnection.isReady()).resolves.toBe(false);
  });
});

//create a list of all new additions to each version of Javascript since ES5 through ESNext separated by version and listed by popularity among leading organizations within each section
