import * as tf from "@tensorflow/tfjs";
import { stdev, mean } from "stats-lite";
import { typeCheck } from "type-check";

import {
  tensorTypeDef,
  TYPEDEF_NORMALIZED_NUMERIC_1D,
  TYPEDEF_NORMALIZED_NUMERIC_2D,
  TYPEDEF_SCALAR_NUMERIC_1D,
  TYPEDEF_SCALAR_NUMERIC_2D,
} from "../wbf";

const ortho = inputs => ({
  m: mean(inputs),
  s: stdev(inputs),
});

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
const shouldOrtho = (data, normals) => {
  const { m, s } = normals;
  const i = 1 / s;
  return new Float32Array(data.map(e => ((e - m) * i)));
};

const reshape2d = ([...tensors]) => {
  const data = tf.concat(tensors);
  const { shape } = data;
  return data.reshape([tensors.length, shape[0] / tensors.length]).transpose();
};

export const normalize = () => handle =>
  [
    handle(
      "[Number]",
      (input, { useState }) => {
        const [normals] = useState(
          () => ortho(input),
        );
        return tensorTypeDef(
          TYPEDEF_NORMALIZED_NUMERIC_1D,
          tf.tensor1d(shouldOrtho(input, normals)),
          {
            ...normals,
          },
        );
      },
    ),
    handle(
      '[[Number]]',
      (inputs, { useState }) => {
        const [normals] = useState(
          () => inputs.map(t => ortho(t)),
        );
        const data = inputs.map((input, i) => shouldOrtho(input, normals[i]));
        return tensorTypeDef(
          TYPEDEF_NORMALIZED_NUMERIC_2D,
          reshape2d(data),
          {
            m: normals.map(({ m }) => m),
            s: normals.map(({ s }) => s),
          },
        );
      },
    ),
  ] && undefined;

export const scalar = () => handle =>
  [
    handle("[Number]", input => tensorTypeDef(
        TYPEDEF_SCALAR_NUMERIC_1D,
        tf.tensor1d(new Float32Array(input)),
      ),
    ),
    handle("[[Number]]", inputs => tensorTypeDef(
        TYPEDEF_SCALAR_NUMERIC_2D,
        reshape2d(inputs.map(i => tf.tensor1d(new Float32Array(i))))
      ),
    ),
  ] && undefined;

export const oneHot = () => handle => [
  handle(
    "[[String]]", () => console.log('ici str'),
  ),
  handle(
    "[[Number]]", () => console.log('ici number'),
  ),
] && undefined;
