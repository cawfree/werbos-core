import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { stream, next } from "../src";

it("should be capable of incrementally streaming mnist data", async () => {

  const app = werbos()
    .sep(
      // define whether we want to skip?
      stream()
        // XXX: Capable of parsing the message.
        .use(files(), files()),
    )
    .use(
      threshold(),oneHot(),
    );

  // TODO: Seeded execution perhaps?
  // XXX:  No way to one-hot. Unless the data is just handed to us, perhaps.
  await app(next('/home/cawfree/Development/mnist-png', '/home/cawfree/Development/mnist-png'));
  await app(next());
  await app(next());
  await app(next());

  //  await app(next());
  //  await app(next());
  //  await app(next());
  //  await app(next());
  //  await app(end());

  // XXX: Define initial properties.
  //console.log(await app(next({ limit: 10 })));
});
