/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { typeCheck } from "type-check";
import { justOnce, noop } from "rippleware";

import werbos, { files, oneHot, sequential, dense, train } from "../src";

it("should be capable of reuters newswire classification", () => {
  // XXX: Although an article can have multiple topics, for now we're only performing
  //      multiclass classification to find a single topic.
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
    .use(noop(), h =>
      h("*", input => {
        console.log("topics");
        console.log(input);
        return input;
      })
    )
    .use([oneHot({ max: 10000 })], oneHot({ max: 46 }))
    .use(
      sequential()
        .use(dense({ units: 64 }))
        .use(dense({ units: 64, activation: "relu" }))
        .use(dense())
    )
    .use(train());

  app("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json");

  console.log(
    app("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json")
  );

  expect(true).toBeTruthy();
});
