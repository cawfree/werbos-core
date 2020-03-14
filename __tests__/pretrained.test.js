import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { pretrained } from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("should load a graph model from tensorhub", async () => {
  const app = werbos()
    .use(
      //pretrained("https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v1_025_224/classification/1/default/1"),
      pretrained('https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json'),
    );
  console.log(await app());
});
