import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { pretrained, files, threshold, oneHot } from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should load a graph model from tensorhub", async () => {

  // const modelUrl =
  //      'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';
  // const model = await tf.loadGraphModel(modelUrl, {fromTFHub: true});
  // const zeros = tf.zeros([1, 224, 224, 3]);
  // model.predict(zeros).print();

  const app = werbos()
    .use(files(), files())
    .mix(threshold(), oneHot())
    .use(
      //pretrained("https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v1_025_224/classification/1/default/1"),
      pretrained('https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2'),
    );

  const testResults = await app(
    "/home/cawfree/Development/mnist-dataset/public/train-images-idx3-ubyte.json",
    "/home/cawfree/Development/mnist-dataset/public/train-labels-idx1-ubyte.json"
  );
  console.log(testResults);
});
