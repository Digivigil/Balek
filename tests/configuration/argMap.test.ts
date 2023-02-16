import { describe, expect, it } from "@jest/globals";
import { CommandLineArgumentsMap } from "../../src/Instance/Configuration/ArgMap";

describe("commandLineArgumentsMap", () => {
  it("should return a map of the command line arguments", () => {
    const result = new CommandLineArgumentsMap([
      "node",
      "index.js",
      "--mode=production",
      "--port=8080",
      "--host=localhost",
    ]);
    expect(result.get("node")).toBeUndefined();
    expect(result.get("index.js")).toBeUndefined();

    expect(result.get("mode") != undefined ? result.get("mode") : "").toMatch(
      "production"
    );
    expect(result.get("port")).toEqual("8080");
    expect(result.get("host")).toEqual("localhost");
  });

  it("should return a map of the command line arguments when there is no equals sign", () => {
    const result = new CommandLineArgumentsMap([
      "node",
      "index.js",
      "--mode",
      "production",
      "--port",
      "8080",
      "--host",
      "localhost",
    ]);

    expect(result.get("mode") || "").toMatch("production");
    expect(result.get("port")).toEqual("8080");
    expect(result.get("host")).toEqual("localhost");
  });

  it("should return a map of the command line arguments when there is no equals sign", () => {
    const result = new CommandLineArgumentsMap([
      "node",
      "index.js",
      "--mode=production",
      "--port",
      "8080",
      "--host=localhost",
    ]);

    expect(result.get("mode") || "").toMatch("production");
    expect(result.get("port")).toEqual("8080");
    expect(result.get("host")).toEqual("localhost");
  });
});
