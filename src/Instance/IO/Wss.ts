/**
 *
 * @module WebSockets
 * @category IO
 * @internal
 */

import WebSocket, { WebSocketServer } from "ws";
import { WebSocketConnection } from "./Wss/Connection";
import crypto from "node:crypto";
import { IncomingMessage } from "http";
import { Socket } from "net";

/**
 * Class for handling WebSockets connections
 * Keeps track of and delegates the WebSocket connection
 * Also provides methods for retrieving and closing connections
 */
export class WebSockets {
  private readonly server: WebSocketServer;
  private connections: Map<string, WebSocketConnection>;
  /**
   * Constructor for WebSockets class
   */
  constructor() {
    this.connections = new Map<string, WebSocketConnection>();
    this.server = new WebSocketServer({ noServer: true });
    this.server.on("connection", this.handleConnection.bind(this));
  }
  /**
   * Method that handles incoming connections
   * @param ws - The WebSocket instance
   */
  private handleConnection(ws: WebSocket) {
    let connection = new WebSocketConnection(ws);
    let newConnectionID = this.setID(connection);

    ws.on("close", () => {
      this.connections.delete(newConnectionID);
    });
  }
  /**
   * Handle WebSocket upgrade
   * @param request - IncomingMessage object representing the request to the server
   * @param socket - Socket object representing the underlying connection
   * @param head - Buffer holding the first packet of the upgraded stream
   */
  public handleUpgrade(request: IncomingMessage, socket: Socket, head: Buffer) {
    this.server.handleUpgrade(request, socket, head, (ws) => {
      this.server.emit("connection", ws, request);
    });
  }
  /**
   * Method that creates a new ID for a connection
   */
  private setID(connection: WebSocketConnection): string {
    let newID = "";
    do {
      let id = `WSID:${crypto.randomBytes(20).toString("hex")}`;
      newID = !this.connections.has(id) ? id : "";
    } while (newID === "");
    this.connections.set(newID, connection);
    return newID;
  }
  public async stop() {
    this.server.close();
  }
  /**
   * Asynchronous method that indicates if the WebSockets server is ready
   * @returns A promise that resolves to a boolean indicating if the server is ready
   */
  async isReady(): Promise<boolean> {
    return true;
  }
}
