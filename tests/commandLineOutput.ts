import configuration from "../src/Instance/Configuration";

import { EnvironmentVariablesMap } from "../src/Instance/Configuration/EnvMap";

const environmentVariablesMap = new EnvironmentVariablesMap();

//const settings = Configuration.getSettingsMap();
//settings.forEach((value, key) => console.log(`${key}:${value}`));
environmentVariablesMap.forEach((value, key) =>
  console.log(`${key}|#|${value}`)
);

//Configuration.forEach((value, key) => console.log(`${key}|#|${value}`));

console.log(process.argv);
console.log(configuration.get("version"));
