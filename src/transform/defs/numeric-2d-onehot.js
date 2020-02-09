import { symbolize, oneHot } from '../model';

// TODO: Extract, sanitize, etc.
const max = 1;

export default () => (inputs, { useState }) => {
  const features = inputs.reduce((arr, e) => arr.concat(...e), []);
  const [sym] = useState(() => symbolize([].concat(...features), max));
  return oneHot(features.map(f => [f]), sym);
};
