/**
 *  @jest-environment node
 */
import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import werbos, {
  Meta,
  https,
  normalize,
  scalar,
  sequential,
  dense,
  kfold,
} from "../src";

jest.setTimeout(24 * 60 * 60 * 100);

it("should be capable of calculating regression using the boston dataset", async () => {

  const app = werbos()
    .use(https())
    .all(
      [
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
          /$.*.lstat/,
        ],
        [/$.*.medv/],
      ],
    )
    .mix(normalize(), scalar())
    .use(
      sequential()
        .use(dense({ units: 64 }))
        .use(dense({ units: 64 }))
        .use(dense()),
    )
    .use(kfold({ batchSize: 32, epochs: 25, shuffle: true }));

  await app("https://raw.githubusercontent.com/cawfree/boston-housing-dataset/master/data.json");

  //const y = await app([
  //  {
  //    crim: 0.06905,
  //    zn: 0,
  //    indus: 2.18,
  //    chas: 0,
  //    nox: 0.458,
  //    rm: 7.147,
  //    age: 54.2,
  //    dis: 6.0622,
  //    rad: 3,
  //    tax: 222,
  //    ptratio: 18.7,
  //    b: 396.9,
  //    lstat: 5.33,
  //    medv: 36.2
  //  },
  //  {
  //    crim: 0.00632,
  //    zn: 18,
  //    indus: 2.31,
  //    chas: 0,
  //    nox: 0.538,
  //    rm: 6.575,
  //    age: 65.2,
  //    dis: 4.09,
  //    rad: 1,
  //    tax: 296,
  //    ptratio: 15.3,
  //    b: 396.9,
  //    lstat: 4.98,
  //    medv: 24
  //  }
  //]);

  //console.log(y);

  //// TODO: Need to validate specific values.
  //expect(true).toBeTruthy();
});
