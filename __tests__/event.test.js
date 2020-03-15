import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import { noop } from "rippleware";

import werbos, { train, predict, Training, Predicting } from "../src";

it("should appropriately setup training and prediction event data", async () => {
  const app = werbos()
    .all(noop());

  expect(await app(train(1, 2, 3))).toEqual([1, 2, 3]);
  expect(await app(predict(4, 5, 6))).toEqual([4, 5, 6]);

  const app2 = werbos()
    .use(
      [
        [Training, () => "Training!"],
        [Predicting, () => "Predicting!"],
      ],
    );

  expect(await app2(train())).toEqual(["Training!"]);
  expect(await app2(predict())).toEqual(["Predicting!"]);
});
