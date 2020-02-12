/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { print, noop } from "rippleware";

import werbos, {
  justOnce,
  files,
  oneHot,
  sequential,
  dense,
  train
} from "../src";

it("should be capable of reuters newswire classification", () => {

  const onlyValidArticles = () => handle => handle('[*]', articles => articles.filter(
    ({ topics, text: { body } }) => Array.isArray(topics) && topics.length > 0 && typeof body === 'string' && body.length > 0
  ));

  const app = werbos()
    .use(files())
    .use(/$.articles/)
    .use([onlyValidArticles()])
    .use([[/$.*.text.body/], [/$.*.topics/]])
    .use([noop()], [[noop()]])
    .use(oneHot({ max: 256 }), noop())
    .use(print(), noop());

  app('/home/cawfree/Development/reuters-dataset/public/reuters-dataset.json');

});
