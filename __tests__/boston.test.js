/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { https, normalize, scalar, sequential, dense } from "../src";

it("should be capable of calculating regression using the boston dataset", () => {
  const app = werbos()
    .use(https())
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
    .use(
      sequential()
        .use(dense({ units: 20 }))
        .use(dense({ units: 10 }))
        .use(dense())
    );

  app("https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json");

  expect(true).toBeTruthy();
});
