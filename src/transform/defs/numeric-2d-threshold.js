import { concat, tensor1d, scalar } from '@tensorflow/tfjs';
import otsu from 'otsu';

import { reshape2d } from '../model';

export default () => inputs => reshape2d(
  inputs.map(
    input => tensor1d(input)
      .sub(scalar(otsu(input)))
      .sign()
      .relu(),
  ),
);
