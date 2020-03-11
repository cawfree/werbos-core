import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { noop } from "rippleware";
import werbos, { stream, next, files } from "../src";

it("should be capable of incrementally streaming mnist data", async () => {

  const app = werbos()
    .use(
      [
        // TODO: Eventually, we'll need to abstract this kind of functionality.
        ['(String)', stream()
          .use(() => true),
        ],
        ['*', noop()],
      ],
    );
  
  console.log(await app(next()));
  console.log(await app(4));
  // await app(next(['/home/cawfree/Development'], ['/home/cawfree/Development/']));
});
