import { symbolize, oneHot } from "../model";

const defaultOptions = Object.freeze({
  max: Number.POSITIVE_INFINITY,
  exp: /\w+\s+/g
});

export default (opts = defaultOptions) => (inputs, { useState }) => {
  const { max, exp } = { ...defaultOptions, ...opts };
  const features = inputs.reduce(
    (arr, e) => arr.concat(e.map(f => f.toLowerCase().match(exp))),
    []
  );
  const [sym] = useState(() => symbolize([].concat(...features), max));
  return oneHot(features, sym);
};
