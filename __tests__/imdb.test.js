/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { noop } from "rippleware";
import werbos, { https, oneHot, sequential, dense, dropout, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should be capable of calculating imdb review sentiment", async () => {
  const app = werbos()
    .all(
      [
        ...https(),
        ['*', noop()],
      ],
    )
    .all(
      [
        [/$.*.t/],
        [/$.*.s/],
      ],
    )
    .mix(oneHot({ max: 512 }), oneHot())
    .use(
      sequential()
        .use(dense({ units: 16 }))
        .use(dropout())
        .use(dense({ units: 16, activation: 'relu' }))
        .use(dropout())
        .use(dense())
    )
    .use(train({ epochs: 20, batchSize: 512 }));

  await app("https://github.com/nas5w/imdb-data/raw/master/reviews.json");

  const results = await app([
    {
      t:
        "This movie was totally and utterly crap. What a waste of time. I will never watch this again.",
      s: 0
    },
    {
      t:
        "Greatest movie I've ever seen in my life. I loved every scene, it was a beautiful masterpiece.",
      s: 1
    }
  ]);

  console.log(results);
});
