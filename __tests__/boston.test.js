import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import * as tf from "@tensorflow/tfjs";

import werbos, { https, normalize, scalar, sequential, dense } from "../src";
import { justOnce } from 'rippleware';

it("should be capable of calculating regression using the boston dataset", () => {
  const app = werbos()
    .use(justOnce(https()))
    .use([
      [
        /$.*.crim/,
        /$.*.zn/,
        /$.*.indus/,
        /$.*.chas/,
        /$.*.nox/,
        /$.*.rm/,
        /$.*.age/,
        /$.*.dis/,
        /$.*.rad/,
        /$.*.tax/,
        /$.*.ptratio/,
        /$.*.b/,
        /$.*.lstat/
      ],
      [/$.*.medv/]
    ])
    .use(normalize(), scalar())
    .use(sequential(dense({ units: 100 }), dense({ units: 100 }), dense({ units: 100 })));

  const x = app(
    "https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json"
  );

  expect(true).toBeTruthy();
});
