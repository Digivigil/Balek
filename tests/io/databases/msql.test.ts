import { describe, expect, test } from "@jest/globals";
import { SqlDatabaseConnection } from "../../../src/Instance/IO/Databases/Sql";

const msqlDatabaseConnection = new SqlDatabaseConnection();

describe("Testing  IO SqlDatabaseConnection Class", () => {
  test("SqlDatabaseConnection Class isReady resolves", async () => {
    await expect(msqlDatabaseConnection.isReady()).resolves.toBe(false);
  });
});
