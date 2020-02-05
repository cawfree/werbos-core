import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import werbos, { files, threshold, oneHot } from '../src';

it("should be capable of recognizing handwritten digits", () => {
  const app = werbos()
    .use(files())
    .use(threshold(), oneHot());

  const result = app(
    '/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json', // raw pixel data... how to process?
    '/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json', // raw labels
  );

  console.log(result);
  //const y = app(
  //  '/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json',
  //  '/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json',
  //);
});
