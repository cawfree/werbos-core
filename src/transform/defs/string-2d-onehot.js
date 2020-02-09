import { symbolize, oneHot } from '../model';

// TODO: Need to abstract regex
const max = 1;
const regexp = /\w+\s+/g;

export default () => (inputs) => {
  const features = inputs.reduce((arr, e) => arr.concat(e.map(f => f.toLowerCase().match(regexp))), []);
  const [sym] = useState(() => symbols([].concat(...features), max));
  return oneHot(features, sym);
};
