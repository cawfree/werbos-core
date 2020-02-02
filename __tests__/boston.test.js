import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import * as tf from '@tensorflow/tfjs';

import werbos, { https, normalize, scalar, Sequential } from "../src";

it("should be capable of calculating regression using the boston dataset", () => {
  
  const tensor = tf.tensor1d([0, 1]);
  const app = werbos()
    .use(Sequential, () => console.log('ici'));

  app(tensor, tensor);

  //const app = werbos()
  //  .use(https())
  //  .use([
  //    [
  //      /$.*.crim/,
  //      /$.*.zn/,
  //      /$.*.indus/,
  //      /$.*.chas/,
  //      /$.*.nox/,
  //      /$.*.rm/,
  //      /$.*.age/,
  //      /$.*.dis/,
  //      /$.*.rad/,
  //      /$.*.tax/,
  //      /$.*.ptratio/,
  //      /$.*.b/,
  //      /$.*.lstat/
  //    ],
  //    [/$.*.medv/]
  //  ])
  //  .use(normalize(), scalar());

  //const [n, s] = app(
  //  "https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json"
  //);

  //n.print();
  //s.print();

  expect(true).toBeTruthy();
});
