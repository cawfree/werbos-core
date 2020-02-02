import * as tf from '@tensorflow/tfjs';
import { stdev, mean } from 'stats-lite';

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
const normalizeInputs = (inputs) => {
  const m = mean(inputs);
  const s = 1 / stdev(inputs);
  return new Float32Array(
    inputs
      .map(e => (e - m) * s),
  );
};

//tf.tensor1d(inputs.map(input => normalizeInputs(input)))

export const normalize = () => handle => [
  handle('[Number]', input => tf.tensor1d(normalizeInputs(input))),
  handle(
    '[[Number]]',
    (inputs) => {
      const f = inputs.map(t => tf.tensor1d(t));
      const data = tf.concat(f);
      const { shape } = data;
      return data
        .reshape(
          [inputs.length, shape[0] / inputs.length],
        )
        .transpose();
    },
  ),
] && undefined;
