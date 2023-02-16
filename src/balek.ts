/**
 * @internal
 * @module Start
 * @category Instance
 */

import { BalekServerInstance } from "./Instance";
//Start Function
async function start() {
  try {
    let newInstance = new BalekServerInstance();
    await newInstance.isReady();
    await newInstance.start();
    console.log("Instance is ready");
  } catch (Error) {
    console.log(`Error While Starting ${Error}`);
  } finally {
    console.log("Finally");
  }
}
console.log("Balek Instance Starting");
start()
  .then(() => {
    console.log("Started");
  })
  .catch((Error) => {
    console.log("Error:", Error);
  });
