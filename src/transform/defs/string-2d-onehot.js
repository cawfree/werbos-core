import { symbolize, oneHot } from "../model";

const defaultOptions = Object.freeze({
  max: Number.POSITIVE_INFINITY,
  exp: /(\w\w*)/g
});

export default (opts = defaultOptions) => (inputs, { useState, useTensor }) => {
  const { max, exp } = { ...defaultOptions, ...opts };
  const features = inputs.reduce(
    (arr, e) => arr.concat(e.map(f => f.toLowerCase().match(exp))),
    []
  );
  const [sym] = useState(() => symbolize([].concat(...features), max));
  return useTensor({ sym }) || oneHot(features, sym);
};
