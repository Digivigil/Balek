/**
 * Exports the IO class
 *
 *
 * @module IO
 * @category IO
 * @internal
 */
import { Https } from "./IO/Https";
import { WebSockets } from "./IO/Wss";

export class IO {
  private readonly https: Https;
  private readonly webSockets: WebSockets;
  constructor() {
    this.https = new Https();
    this.webSockets = new WebSockets();

    this.https.addWebSocketServer(this.webSockets, "/wss");
    // console.log("IO Started")
  }

  public async start() {
    await this.https.start();
  }
  public async stop() {
    await this.https.stop();
    await this.webSockets.stop();
  }
  async isReady() {
    await this.https.isReady();
    return true;
  }
}
