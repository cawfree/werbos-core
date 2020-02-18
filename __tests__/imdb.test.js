/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { justOnce } from "rippleware";

import werbos, { https, oneHot, sequential, dense, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should be capable of calculating imdb review sentiment", async () => {
  const app = werbos()
    .use(justOnce(https()))
    .use([[/$.*.t/], [/$.*.s/]])
    .use(oneHot({ max: 512 }), oneHot())
    .use(
      sequential()
        .use(dense({ units: 128 }))
        .use(dense({ units: 64 }))
        .use(dense())
    )
    .use(train());

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

  expect(true).toBeTruthy();
});
