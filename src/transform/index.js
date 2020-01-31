import { stdev, mean } from 'stats-lite';

// https://en.wikipedia.org/wiki/Feature_scaling#Standardization_(Z-score_Normalization)
const normalizeInputs = (inputs) => {
  const m = mean(inputs);
  const s = 1 / stdev(inputs);
  return inputs
    .map(e => (e - m) * s);
};

export const normalize = () => handle => [
  handle('[Number]', input => normalizeInputs(input)),
  handle('[[Number]]', inputs => inputs.map(input => normalizeInputs(input))),
] && undefined;
