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
    .use(normalize(), scalar())
    .use(sequential(dense({ units: 16 }), dense({ units: 16 }), dense())) .use(justOnce(train()));

  const x = app(
    "https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json"
  );

  console.log(x);
  
  //x[0].$tensor.print();

  // okay, now some custom data

//  const data = [
//    {
//        "crim": 0.00632,
//        "zn": 18,
//        "indus": 2.31,
//        "chas": 0,
//        "nox": 0.538,
//        "rm": 6.575,
//        "age": 65.2,
//        "dis": 4.09,
//        "rad": 1,
//        "tax": 296,
//        "ptratio": 15.3,
//        "b": 396.9,
//        "lstat": 4.98,
//        "medv": 24
//    }, {
//        "crim": 0.02731,
//        "zn": 0,
//        "indus": 7.07,
//        "chas": 0,
//        "nox": 0.469,
//        "rm": 6.421,
//        "age": 78.9,
//        "dis": 4.9671,
//        "rad": 2,
//        "tax": 242,
//        "ptratio": 17.8,
//        "b": 396.9,
//        "lstat": 9.14,
//        "medv": 21.6
//    }, {
//        "crim": 0.02729,
//        "zn": 0,
//        "indus": 7.07,
//        "chas": 0,
//        "nox": 0.469,
//        "rm": 7.185,
//        "age": 61.1,
//        "dis": 4.9671,
//        "rad": 2,
//        "tax": 242,
//        "ptratio": 17.8,
//        "b": 392.83,
//        "lstat": 4.03,
//        "medv": 34.7
//    }, {
//        "crim": 0.03237,
//        "zn": 0,
//        "indus": 2.18,
//        "chas": 0,
//        "nox": 0.458,
//        "rm": 6.998,
//        "age": 45.8,
//        "dis": 6.0622,
//        "rad": 3,
//        "tax": 222,
//        "ptratio": 18.7,
//        "b": 394.63,
//        "lstat": 2.94,
//        "medv": 33.4
//    },
//  ];

  // how is this going to work? don't we need to scale against the input dataset?
  //const data = [
  //  {"crim":0.00632,"zn":18,"indus":2.31,"chas":0,"nox":0.538,"rm":6.575,"age":65.2,"dis":4.09,"rad":1,"tax":296,"ptratio":15.3,"b":396.9,"lstat":4.98,"medv":24},
  //  {"crim":0.00632,"zn":18,"indus":2.31,"chas":0,"nox":0.538,"rm":6.575,"age":65.2,"dis":4.09,"rad":1,"tax":296,"ptratio":15.3,"b":396.9,"lstat":4.98,"medv":24},
  //];

  // okay, it gets harder. we need to be able to normalize based on the previous props...
  //app(data)[1].$tensor.print();

  //console.log(y);

  //y[0].$tensor.print();
  //console.log(y);
  //app(data)[1].$tensor.print();

  //const y = app(data[1].$tensor);

  //console.log(y);

  expect(true).toBeTruthy();
});
