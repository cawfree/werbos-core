import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { pretrained, files, threshold, oneHot, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should load a graph model from tfhub", async () => {

  // use for classification... how?
  const app = werbos()
    .use(files(), files())
    .mix(threshold(), oneHot())
    .use(pretrained('https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2'));
    //.use(fitOrPredict());

  const testResults = await app(
    "/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json"
  );
  console.log(testResults);
});
