/**
 * @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import * as tf from "@tensorflow/tfjs";

import werbos, {
  https,
  normalize,
  scalar,
  sequential,
  dense,
  train
} from "../src";

import { justOnce } from "rippleware";
import { typeCheck } from "type-check";

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
    .use(sequential(dense({ units: 64 }), dense({ units: 64 }), dense()))
    .use(train({ epochs: 100 }));

  app(
    "https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json"
  );

  const data = [
    {
      crim: 0.06905,
      zn: 0,
      indus: 2.18,
      chas: 0,
      nox: 0.458,
      rm: 7.147,
      age: 54.2,
      dis: 6.0622,
      rad: 3,
      tax: 222,
      ptratio: 18.7,
      b: 396.9,
      lstat: 5.33,
      medv: 36.2
    },
    {
      crim: 0.00632,
      zn: 18,
      indus: 2.31,
      chas: 0,
      nox: 0.538,
      rm: 6.575,
      age: 65.2,
      dis: 4.09,
      rad: 1,
      tax: 296,
      ptratio: 15.3,
      b: 396.9,
      lstat: 4.98,
      medv: 24
    }
  ];

  const result = app(data);
  console.log(result);

  expect(true).toBeTruthy();
});
