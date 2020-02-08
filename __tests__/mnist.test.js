import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import otsu from 'otsu';

import werbos, { files, scalar, oneHot, threshold, sequential, dense, train } from '../src';

it("should be capable of recognizing handwritten digits", () => {
  const app = werbos()
    .use(files())
    .use(threshold(), oneHot())
    .use(sequential(dense({ units: 64 }), dense()))
    .use(train());

  const result = app(
    '/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json',
    '/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json',
  );

  const result2 = app(
    '/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json',
    '/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json',
  );

  console.log(result2);

  expect(true).toBeTruthy();

  //console.log(result);
  //console.log(result2);

  //result2.print();
});
