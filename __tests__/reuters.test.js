/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { typeCheck } from "type-check";

import werbos, { files, oneHot, sequential, dense, train } from "../src";

jest.setTimeout(24 * 60 * 60 * 100);

it("should be capable of reuters newswire classification", async () => {
  const getData = werbos()
    .use(files());

  const data = await getData("/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json");

  const app = werbos()
    .use(/$.articles/)
    .use(articles => [].concat(...articles))
    .use(
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
    .all([[/$.*.body/], [/$.*.topic/]])
    .mix(oneHot({ max: 1000 }), oneHot({ max: 46 }))
    .use(
      sequential()
        .use(dense({ units: 64 }))
        .use(dense({ units: 64, activation: "relu" }))
        .use(dense())
    )
    .use(train());

  await app(...data);

  //console.log(await app(...data));

  //expect(true)
  //  .toBeTruthy();
});
