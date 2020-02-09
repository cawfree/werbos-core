import { tensor1d } from '@tensorflow/tfjs';

import { stats, scaleFeatures } from '../model';

export default () => (input, { useState }) => {
  const [[mean, std]] = useState(() => stats(input));
  return tensor1d(scaleFeatures(input, mean, std));
};
