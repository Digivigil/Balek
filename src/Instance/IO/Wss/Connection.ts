/**
 * WebSocketConnection exported as a Class
 * @module WebSocketConnection
 * @category IO
 * @internal
 */
import Configuration from "../../Configuration";
//get current value
const version = Configuration.get("version");
import WebSocket from "ws";
/**
 * Provides a wrapper for the ws module
 * @class WebSocketConnection
 * @category IO
 */
export class WebSocketConnection {
  private ws: WebSocket;
  constructor(ws: WebSocket) {
    this.ws = ws;

    if (ws && typeof ws.on === "function") {
      ws.on("message", (message: string) => {
        this.onMessage(message);
      });
      ws.on("message", (message: Buffer) => {
        this.onMessage(message);
      });
      ws.on("error", this.handleError.bind(this));
      ws.on("close", this.handleClose.bind(this));
      if (ws.readyState !== WebSocket.OPEN) {
        ws.on("open", this.handleOpen.bind(this));
      } else if (ws.readyState === WebSocket.OPEN) {
        this.handleOpen.call(this);
      }
    }
  }
  /**
   * Method that handles incoming messages
   * @param message - The incoming message, either a string or a Buffer
   */
  private onMessage(message: string): void;
  private onMessage(message: Buffer): void;
  private onMessage(message: string | Buffer): void {
    if (typeof message === "string") {
    } else if (Buffer.isBuffer(message)) {
    }
  }
  /**
   * Method that handles error events
   * @param error - The error that occurred
   */
  private handleError(error: Error) {}
  /**
   * Method that handles Open events
   *
   */
  private handleOpen() {
    this.ws.send(`Balek Version: ${version}`);
  }
  /**
   * Method that handles close events
   * @param code - The WebSocket close code
   */
  private handleClose(code: number) {}
  async isReady() {
    return false;
  }
}
