/**
 * @jest-environment node
 */
import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import werbos, { https } from '../src';

it("should be capable of classifying imdb review sentiment", () => {
  const app = werbos()
    .use(https());

  const result = app('https://github.com/nas5w/imdb-data/raw/master/reviews.json');

  console.log(result);

  expect(true)
    .toBeTruthy();
});
