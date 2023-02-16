/**
 * HTTPS server
 * @module Https
 * @category IO
 * @internal
 */

import * as https from "https";
import { parse } from "url";
import { IncomingMessage, ServerResponse, OutgoingHttpHeaders } from "http";
import { WebSockets } from "./Wss";
import { Socket } from "net";

import { Files } from "./Files";
const files = new Files();
import { FixedSizeArray } from "../../Utility/DataStructures";

const mimiTypes = {
  txt: "text/text",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ico: "image/x-icon",
  png: "image/png",
  svg: "image/svg+xml",
};

/**
 * Class representing the HTTPS server
 *
 */
export class Https {
  /**
   * The HTTPS server
   */
  private server: https.Server | undefined;

  private wssPaths = new Map<string | null, WebSockets>();

  private requestLog = new FixedSizeArray<OutgoingHttpHeaders>(10);
  private errorLog = new FixedSizeArray<Error>(10);
  /**
   * Creates a new instance of the HTTPS server
   */
  constructor() {}
  /**
   * Starts the HTTPS server
   *
   * @throws {Error} If an error occurs while starting the server
   */
  public async start() {
    try {
      this.server = https.createServer({
        key: await files.returnFile("./config/key.pem"),
        cert: await files.returnFile("./config/cert.pem"),
      });
      this.server.on("request", this.handleRequest.bind(this));
      this.server.on("upgrade", this.handleUpgrade.bind(this));
      this.server.on("error", this.handleError.bind(this));
      this.server.listen(443);
    } catch (error) {
      throw error;
    }
  }
  /**
   * Stops the HTTPS server
   *
   * @throws {Error} If an error occurs while starting the server
   */
  public async stop() {
    if (this.server !== undefined) {
      this.server.close();
    }
  }
  /**
   * Handles incoming requests from listening server
   *
   */
  private handleRequest(request: IncomingMessage, response: ServerResponse) {
    this.requestLog.add(request.headers);

    const url = parse(request.url || "");
    const pathname = url.pathname || "";
    if (pathname.startsWith("/api/")) {
      let result = "<pre>";
      this.requestLog.forEach((entry) => {
        result += `${JSON.stringify(entry, null, 2)}\n`;
      });
      this.errorLog.forEach((entry) => {
        result += `${JSON.stringify(entry, null, 2)}\n`;
      });
      result += "</pre>";

      this.sendContent(response, mimiTypes.html, result);
    } else {
      let result = "FORBIDDEN";
      this.sendContent(response, mimiTypes.html, result);
    }
  }
  /**
   * Handles incoming Wss Upgrade requests from listening server
   *
   */
  private handleUpgrade(
    request: IncomingMessage,
    socket: Socket,
    head: Buffer
  ) {
    const { pathname } = parse(request.url || "");
    const webSockets = this.wssPaths.get(pathname);
    if (webSockets) {
      webSockets.handleUpgrade(request, socket, head);
    } else {
      socket.destroy();
    }
  }
  /**
   * Handles incoming requests from listening server
   *
   */
  private handleError(error: Error) {
    this.errorLog.add(error);
    console.error(error);
  }
  /**
   * Sends content in the response.
   * @param response - The response to send the content to.
   * @param contentType - The type of content being sent (e.g. "text/html").
   * @param contentData - The data of the content being sent.
   */
  private sendContent(
    response: ServerResponse,
    contentType: string,
    contentData: string
  ) {
    let content_length = contentData.length;
    response.writeHead(200, {
      "Content-Length": content_length,
      "Content-Type": contentType,
    });
    response.end(contentData);
  }
  /**
   * Adds a new WebSocket server for a specific path
   * @param {WebSockets} webSockets - The WebSockets instance to add
   * @param {string} path - The path for which the WebSockets instance will be added
   */
  public addWebSocketServer(webSockets: WebSockets, path: string) {
    this.wssPaths.set(path, webSockets);
  }
  /**
   * Returns a boolean indicating whether the required files for the HTTPS server are ready
   *
   * @returns {Promise<boolean>} True
   */
  async isReady() {
    return true;
  }
}
