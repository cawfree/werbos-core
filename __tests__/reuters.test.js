/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { typeCheck } from "type-check";
import { justOnce } from "rippleware";

import werbos, { files, oneHot, sequential, dense, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 100);

it("should be capable of reuters newswire classification", async () => {
  const getData = werbos()
    .use(files());

  const data = await getData("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json");

  const app = werbos()
    .sep(/$.articles/)
    .mix(
      articles => articles
        .filter(
          ({ text: { body }, topics }) =>
            Array.isArray(topics) &&
            topics.length > 0 &&
            typeof body === "string" &&
            body.length > 0
        )
        .map(({ text: { body }, topics }) => ({ topic: topics[0], body })),
    )
    .sep([[/$.*.*.body/], [/$.*.*.topic/]])
    .mix(oneHot({ max: 10000 }), oneHot({ max: 46 }))
    .use(
      sequential()
        .use(dense({ units: 64 }))
        .use(dense({ units: 64, activation: "relu" }))
        .use(dense())
    )
    .use(train());

  const x = await app(...data);

  console.log(x);

  console.log(await app(...data));

  expect(true)
    .toBeTruthy();
});
