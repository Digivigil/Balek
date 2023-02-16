/**
 * Balek Server Instance:
 * @module Instance
 * @category Instance
 */

import { IO } from "./Instance/IO";
import { Configuration } from "./Instance/Configuration";

const configuration = Configuration.getInstance();

export class BalekServerInstance {
  private readonly io: IO;
  private readonly system: Object;

  private readonly protocol: Object;
  private readonly modules: Object;
  private readonly sessions: Object;

  constructor() {
    this.io = new IO();
    this.system = {};

    this.protocol = {};
    this.modules = {};
    this.sessions = {};
  }

  public async start() {
    await this.io.start();
  }

  public async stop() {
    await this.io.stop();
  }

  public getVersion() {
    return configuration.get("version");
  }

  async isReady() {
    await this.io.isReady();
    return true;
  }
}
