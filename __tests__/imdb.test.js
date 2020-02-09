/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { justOnce } from 'rippleware';

import werbos, { https, oneHot } from "../src";

it("should be capable of calculating imdb review sentiment", () => {
  const app = werbos()
    .use(justOnce(https()))
    .use([[/$.*.t/], [/$.*.s/]])
    .use(oneHot({ max: 1024 }), oneHot());

  console.log(app("https://github.com/nas5w/imdb-data/raw/master/reviews.json"));
  
  expect(true).toBeTruthy();
});
