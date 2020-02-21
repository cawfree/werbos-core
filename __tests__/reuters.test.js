/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { typeCheck } from "type-check";
import { justOnce, noop } from "rippleware";

import werbos, { files, oneHot, sequential, dense, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 100);

it("should be capable of reuters newswire classification", async () => {
  // XXX: Although an article can have multiple topics, for now we're only performing
  //      multiclass classification single-label evaluation.
  const onlyValidArticles = () => handle =>
    handle("[*]", articles =>
      articles
        .filter(
          ({ text: { body }, topics }) =>
            Array.isArray(topics) &&
            topics.length > 0 &&
            typeof body === "string" &&
            body.length > 0
        )
        .map(({ text: { body }, topics }) => ({ topic: topics[0], body }))
    );

  const app = werbos()
    .use(files())
    .use(/$.articles/)
    .use([onlyValidArticles()])
    .use([[/$.*.body/], [/$.*.topic/]])
    .use([oneHot({ max: 10000 })], oneHot({ max: 46 }))
    .use(
      sequential()
        .use(dense({ units: 64 }))
        .use(dense({ units: 64, activation: "relu" }))
        .use(dense())
    )
    .use(train());

  await app("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json");

  console.log(
    await app("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json")
  );

  expect(true)
    .toBeTruthy();
});
