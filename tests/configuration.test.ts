import { describe, expect, test } from "@jest/globals";
import configuration from "../src/Instance/Configuration";

import { skip, take, filter } from "rxjs/operators";

const databaseObservable = configuration.getObservable(
  "database.mongo.database"
);

const valueDoesNotExistObservable = configuration.getObservable(
  "value.does.notExist"
);

const version = configuration.get("version");
const port = configuration.get("https.port");
const loadModuleArray = configuration.get("session.loader.modules");

configuration.set("valueExistsNow", "yes");

describe("Testing Configuration Class", () => {
  test("Package Configuration Matches Version", () => {
    expect(version).toMatch("0.0.02-pre");
  });
  test("Balek Config Class has network settings", () => {
    // @ts-ignore
    expect(port).toMatch(`8080`);
  });
  test("Command Line arguments returned", () => {
    expect(loadModuleArray).toBeInstanceOf(Array);
  });
  test("Observing a setting before it is mapped then setting it", (done) => {
    if (valueDoesNotExistObservable !== undefined) {
      valueDoesNotExistObservable
        .pipe(
          filter((value) => value !== "".valueOf()),
          take(1)
        )
        .subscribe((value) => {
          expect(value).toMatch("nope");
          done();
        });
    } else {
      expect("valueDoesNotExistObservable").toMatch("undefined");
      done();
    }
    configuration.set("value.does.notExist", "nope");
  });
  test("Observing a setting that was set in header", (done) => {
    let valueExistsNowObservable =
      configuration.getObservable("valueExistsNow");
    if (valueExistsNowObservable !== undefined) {
      valueExistsNowObservable.pipe(take(1)).subscribe((value) => {
        expect(value).toMatch("yes");
        done();
      });
    } else {
      expect("valueExistsNowObservable").toMatch("undefined");
      done();
    }
    configuration.set("valueExistsNow", "valueExistsAgain");
  });
  test("Database state update", (done) => {
    if (databaseObservable) {
      databaseObservable.pipe(skip(1), take(1)).subscribe((database) => {
        expect(database).toMatch("hug");
        done();
      });
      configuration.set("database.mongo.database", "hug");
    } else {
      expect("not").toMatch("diaplode");
      done();
    }
  });

  test("Set Object as setting", (done) => {
    if (databaseObservable) {
      databaseObservable.pipe(skip(1), take(1)).subscribe((database) => {
        expect(database).toMatch("nota string");
        done();
      });
      configuration.set("database.mongo.database", {
        host: "hostname",
        port: 2345,
        user: "usernameString",
        password: "passwordString",
        database: "databaseString"
      });
    } else {
      expect("not").toMatch("diaplode");
      done();
    }
  });

  test.skip("if an object is passed as a setting to set, make it change all things inside first", () => {});
});
