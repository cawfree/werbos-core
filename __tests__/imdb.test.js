/**
 * @jest-environment node
 */
import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import werbos, { https, oneHot } from '../src';

it("should be capable of classifying imdb review sentiment", () => {
  const app = werbos()
    .use(https())
    .use(
      [
        [/$.*.t/],
        [/$.*.s/],
      ],
    )
    .use(oneHot(), oneHot());

  const result = app('https://github.com/nas5w/imdb-data/raw/master/reviews.json');

  expect(true)
    .toBeTruthy();
});
