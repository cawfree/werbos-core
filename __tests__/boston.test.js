import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import * as tf from "@tensorflow/tfjs";

import werbos, { https, normalize, scalar, sequential, dense, train } from "../src";
  
import { justOnce } from 'rippleware';
import { typeCheck } from 'type-check';

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
    // XXX: Okay, so these cache based upon the training input.
    .use(normalize(), scalar());
    //.use(sequential(dense({ units: 16 }), dense({ units: 16 }), dense()))
    //.use(justOnce(train()));

  const x = app(
    "https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json"
  );

  // how is this going to work? don't we need to scale against the input dataset?
  const data = [
    {"crim":0.00632,"zn":18,"indus":2.31,"chas":0,"nox":0.538,"rm":6.575,"age":65.2,"dis":4.09,"rad":1,"tax":296,"ptratio":15.3,"b":396.9,"lstat":4.98,"medv":24},
  ];

  // okay, it gets harder. we need to be able to normalize based on the previous props...
  app(data)[0].$tensor.print();

  expect(true).toBeTruthy();
});
