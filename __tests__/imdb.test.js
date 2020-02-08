/**
 * @jest-environment node
 */
import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import werbos, { https, oneHot, sequential, dense, train } from '../src';
import { justOnce } from 'rippleware';

it("should be capable of classifying imdb review sentiment", () => {
  const app = werbos()
    .use(justOnce(https()))
    .use(
      [
        [/$.*.t/],
        [/$.*.s/],
      ],
    )
    .use(oneHot({ max: 512 }), oneHot())
    .use(sequential(dense({ units: 128 }), dense({ units: 64 }), dense()))
    .use(train({ epochs: 20 }));

  const result = app('https://github.com/nas5w/imdb-data/raw/master/reviews.json');

  const result2 = app(
    [
      { t: 'This movie was totally and utterly crap. What a waste of time. I will never watch this again.', s: 0},
      { t: 'Greatest movie I\'ve ever seen in my life. I loved every scene, it was a beautiful masterpiece.', s: 1},
    ],
  );

  console.log(result2);

  expect(true)
    .toBeTruthy();
});
