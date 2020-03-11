import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { noop } from "rippleware";
import werbos, { stream, next, files } from "../src";

it("should be capable of incrementally streaming mnist data", async () => {

  // here's your test directory

  const app = werbos()
    .use(
      [
        // TODO: Eventually, we'll need to abstract this kind of functionality.
        ['(String)', stream()
          .use(files('/home/cawfree/Development/mnist-dataset/public')),
        ],
        ['*', noop()],
      ],
    );

  console.log(await app(next()));

  //console.log(await app(4));
  // await app(next(['/home/cawfree/Development'], ['/home/cawfree/Development/']));
});
