/**
 * @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { justOnce, print, noop } from "rippleware";

import werbos, {
  files,
  threshold,
  oneHot,
  sequential,
  dense,
  train
} from "../src";

jest.setTimeout(24 * 60 * 60 * 100);

it("should be capable of handwriting classification using the mnist dataset", async () => {
  const app = werbos()
    .use(files())
    //.use(noop(), oneHot())
    .use(threshold(), noop())
    .use(
      sequential()
        .use(dense({ units: 512 }))
        .use(dense())
    )
    .use(train({ epochs: 5, batchSize: 28 }));

  const trainingResults = await app(
    "/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json"
  );

  const results = await app(
    "/home/cawfree/Development/mnist-dataset/public/t10k-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/t10k-labels-idx1-ubyte.json"
  );

  console.log(results);

  expect(true)
    .toBeTruthy();
});
