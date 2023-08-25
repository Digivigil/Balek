/**
 * @internal
 * @module Start
 * @category Instance
 */

import { BalekServerInstance } from "./Instance";

import  Log  from "./Utility/Logger";
//Start Function
async function start() {
  try {
    const newError = new Error("Noooppe")
    throw(newError )
    let newInstance = new BalekServerInstance();
    await newInstance.isReady();
    await newInstance.start();
    Log.info("Instance is ready");
  } catch (error) {
    Log.error({error: structuredClone(error)},"Error while starting")
    //Log.info(`Error While Starting ${Error}`);
  } finally {

    Log.info("Finally");
  }
}
Log.info("Balek Instance Starting");
start()
  .then(() => {
    Log.info("Started")
    //console.log("Started");
  })
  .catch((error) => {
    Log.error({error},"Error while starting")
    //console.log("Error:", Error);
  });
