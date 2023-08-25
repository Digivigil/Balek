//export let log;
/**
 * exports Logger
 * @module Logger
 * @category Utility
 */

const pino = require("pino");
//const pinoElastic = require("pino-elasticsearch");

/*const streamToElastic = pinoElastic({
  index: "an-index",
  consistency: "one",
  node: "http://localhost:9200",
  "es-version": 7,
  "flush-bytes": 1000,
});
const Logger = pino(
  {
    name: "balek",
    level: process.env.PINO_LOG_LEVEL || "info",
  }//,
  //streamToElastic
);
*/

const Log = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
});

export default Log;

