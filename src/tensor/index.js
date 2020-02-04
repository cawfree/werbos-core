import * as tf from "@tensorflow/tfjs";
import { stdev, mean } from "stats-lite";
import { typeCheck } from "type-check";

import {
  tensorTypeDef,

  TYPEDEF_NORMALIZED_NUMERIC_1D,
  TYPEDEF_NORMALIZED_NUMERIC_2D,

  TYPEDEF_SCALAR_NUMERIC_1D,
  TYPEDEF_SCALAR_NUMERIC_2D,

  TYPEDEF_ONE_HOT_STRING_2D,
  TYPEDEF_ONE_HOT_NUMERIC_2D,
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

const oneHotDefaultOptions = Object
  .freeze(
    {
      max: Number.MAX_SAFE_INTEGER,
    },
  );

const symbols = (src, max = Number.MAX_SAFE_INTEGER) =>
  Array.from(
    src.reduce((m, s) => {
      m.set(s, (m.get(s) || 0) + 1);
      return m;
    }, new Map())
  )
    .sort(([w1, c1], [w2, c2]) => c2 - c1)
    .map(([w]) => w)
    .filter((_, i) => i < max);

export const oneHot = (options = oneHotDefaultOptions) => (handle) => {
  if (typeCheck('Object', options)) {
    // TODO: Need smarter options handling, as well as per-type initialization.
    const opts = {
      ...oneHotDefaultOptions,
      ...options,
    };
    const { max } = opts;
    handle(
      "[[String]]", (input) => {
        const words = input
          .reduce(
            (arr, e) => arr.concat(...e.map(f => f.toLowerCase().match(/\w+\s+/g))),
            [],
          );
        const sym = symbols(words, max);

      },
    );
    handle(
      "[[Number]]", () => console.log('ici number'),
    );
    return undefined;
  }
  throw new Error(`Expected [object Object], encountered ${options}.`);
};
