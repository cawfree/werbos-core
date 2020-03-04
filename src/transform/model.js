import { tensor1d, concat } from "@tensorflow/tfjs";
import { Map as ImmutableMap } from "immutable";
import { stdev, mean } from "stats-lite";

export const stats = inputs => [mean(inputs), stdev(inputs)];

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
export const scaleFeatures = (data, mean, std) => {
  const i = 1 / std;
  return new Float32Array(data.map(e => (e - mean) * i));
};

export const symbolize = (src, max = Number.MAX_SAFE_INTEGER) =>
  Array.from(
    src.reduce((m, s) => {
      m.set(s, (m.get(s) || 0) + 1);
      return m;
    }, new Map())
  )
    .sort(([w1, c1], [w2, c2]) => c2 - c1)
    .map(([w]) => w)
    .filter((_, i) => i < max);

export const oneHot = (features, symbols) =>
  tensor1d(
    [].concat(
      ...features
        .map(f => f.map(e => symbols.indexOf(e)))
        .map(arr =>
          [...Array(symbols.length)].map((_, i) =>
            arr.indexOf(i) >= 0 ? 1 : 0
          )
        )
    )
  ).reshape([features.length, symbols.length]);

export default ImmutableMap({});
