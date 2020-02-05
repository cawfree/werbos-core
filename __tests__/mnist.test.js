import '@babel/polyfill';
import '@tensorflow/tfjs-node';

import otsu from 'otsu';

// TODO: Remove threshold. // , threshold
import werbos, { files, scalar, oneHot } from '../src';

it("should be capable of recognizing handwritten digits", () => {
  const app = werbos()
    .use(files())
    .use(scalar(), oneHot());

  const result = app(
    '/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json',
    '/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json',
  );

  console.log(result);


    //'/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json', // raw pixel data... how to process?
    //'/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json', // raw labels

  //result[0].print();

  //console.log(JSON.stringify(result[0].dataSync()));

  //console.log(result);
  //const y = app(
  //  '/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json',
  //  '/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json',
  //);
});
