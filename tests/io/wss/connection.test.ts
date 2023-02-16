import { describe, expect, test } from "@jest/globals";
import { WebSocketConnection } from "../../../src/Instance/IO/Wss/Connection";
import { WebSocket } from "ws";

const webSocketConnection = new WebSocketConnection(
  new WebSocket("wss://localhost/")
);

describe("Testing  IO WebSocketConnection Class", () => {
  test("WebSocketConnection Class isReady resolves", async () => {
    await expect(webSocketConnection.isReady()).resolves.toBe(false);
  });
});
