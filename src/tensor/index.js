import * as tf from "@tensorflow/tfjs";
import { stdev, mean } from "stats-lite";

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
const normalizeInputs = inputs => {
  const m = mean(inputs);
  const s = 1 / stdev(inputs);
  return new Float32Array(inputs.map(e => (e - m) * s));
};

const reshape2d = ([...tensors]) => {
  const data = tf.concat(tensors);
  const { shape } = data;
  return data.reshape([tensors.length, shape[0] / tensors.length]).transpose();
};

export const normalize = () => handle =>
  [
    handle("[Number]", input => tf.tensor1d(normalizeInputs(input))),
    handle("[[Number]]", inputs =>
      reshape2d(inputs.map(t => tf.tensor1d(normalizeInputs(t))))
    )
  ] && undefined;

export const scalar = () => handle =>
  [
    handle("[Number]", input => tf.tensor1d(new Float32Array(input))),
    handle("[[Number]]", inputs =>
      reshape2d(inputs.map(i => tf.tensor1d(new Float32Array(i))))
    )
  ] && undefined;
