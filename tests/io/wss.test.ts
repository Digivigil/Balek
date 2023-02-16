import { describe, expect, test } from "@jest/globals";
import { WebSockets } from "../../src/Instance/IO/Wss";

let webSockets = new WebSockets();

describe("Testing IO Websockets Class", () => {
  test("WebSockets Class Exists", async () => {
    await expect(webSockets).toBeInstanceOf(WebSockets);
  });
});
