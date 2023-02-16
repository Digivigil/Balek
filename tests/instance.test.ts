import { describe, expect, test } from "@jest/globals";
import { BalekServerInstance } from "../src/Instance";
import { WebSocket } from "ws";
const balekServerInstance = new BalekServerInstance();
//Start Function
function start() {
  return new Promise(async (resolve) => {
    try {
      await balekServerInstance.start();
      let ws = new WebSocket("wss://localhost/wss", {
        rejectUnauthorized: false,
      });
      ws.on("error", console.error);
      ws.on("message", function message(data) {
        const dataString = data.toString();
        ws.close();
        resolve(dataString);
      });

      return "Success";
    } catch (Error) {
      console.log(`Error While Starting ${Error}`);
      return "Error";
    }
  });
}

describe("Testing  BalekServerInstance Class", () => {
  test("Can connect to localhost and receive Version", (done) => {
    start()
      .then((result) => {
        expect(result).toMatch(/^Balek Version: 0.0.02-pre$/);
        balekServerInstance.stop();
        done();
      })
      .catch((error) => {
        throw error;
      });
  });

  test("Can get Version from Instance", () => {
    let version = balekServerInstance.getVersion();
    expect(version).toMatch(/^0.0.02-pre$/);
  });
});
