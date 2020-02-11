/**
 *  @jest-environment node
 */

import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, { https, normalize, scalar, sequential, dense, train } from "../src";

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
        .use(dense({ units: 64 }))
        .use(dense({ units: 64 }))
        .use(dense())
    )
    .use(train());

  app("https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json");

  expect(true).toBeTruthy();
});
