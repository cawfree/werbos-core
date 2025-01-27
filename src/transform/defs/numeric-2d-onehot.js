import { symbolize, oneHot } from "../model";

const defaultOptions = Object.freeze({ max: Number.POSITIVE_INFINITY });

export default (options = defaultOptions) => (inputs, { useState, useTensor }) => {
  const { max } = { ...defaultOptions, ...options };
  const features = inputs.reduce((arr, e) => arr.concat(...e), []);
  const [sym] = useState(() => symbolize([].concat(...features), max));
  return useTensor({ sym }) || oneHot(features.map(f => [f]), sym);
};
