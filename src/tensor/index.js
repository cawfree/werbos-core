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

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
const normalizeInputs = inputs => {
  const m = mean(inputs);
  const s = 1 / stdev(inputs);
  return {
    m,
    s,
    data: new Float32Array(inputs.map(e => (e - m) * s)),
  };
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
      (input) => {
        const { m, s, data } = normalizeInputs(input);
        return tensorTypeDef(
          TYPEDEF_NORMALIZED_NUMERIC_1D,
          tf.tensor1d(data),
          {
            m,
            s,
          },
        );
      },
    ),
    handle(
      '[[Number]]',
      (inputs) => {
        const normals = inputs.map(t => normalizeInputs(t));
        return tensorTypeDef(
          TYPEDEF_NORMALIZED_NUMERIC_2D,
          reshape2d(normals.map(({ data }) => data)),
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
