/**
 * @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { print } from "rippleware";

import werbos, {
  files,
  threshold,
  oneHot,
  sequential,
  dense,
  train
} from "../src";

it("should be capable of handwriting classification using the mnist dataset", () => {
  const app = werbos()
    .use(files())
    .use(threshold(), oneHot())
    .use(
      sequential()
        .use(dense({ units: 512 }))
        .use(dense())
    )
    .use(train({ epochs: 5, batchSize: 28 }));

  const trainingResults = app(
    "/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json"
  );

  console.log(trainingResults);

  const results = app(
    "/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json"
  );

  console.log(results);
});
