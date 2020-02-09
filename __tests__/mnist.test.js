/**
 * @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { files, threshold, oneHot } from "../src";

it("should be capable of handwriting classification using the mnist dataset", () => {
  const app = werbos()
    .use(files())
    .use(threshold(), oneHot())
    .use('*', (_, { useMeta }) => useMeta());

  console.log(
    app(
      "/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json",
      "/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json"
    )
  );
});
