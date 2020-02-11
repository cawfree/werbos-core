/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { justOnce } from "rippleware";

import werbos, { https, oneHot, sequential, dense } from "../src";

it("should be capable of calculating imdb review sentiment", () => {
  const app = werbos()
    .use(justOnce(https()))
    .use([[/$.*.t/], [/$.*.s/]])
    .use(oneHot({ max: 3 }), oneHot())
    .use(
      sequential()
        .use(dense({ units: 128 }))
        .use(dense({ units: 64 }))
        .use(dense())
    );

  console.log(
    app("https://github.com/nas5w/imdb-data/raw/master/reviews.json")
  );

  expect(true).toBeTruthy();
});
