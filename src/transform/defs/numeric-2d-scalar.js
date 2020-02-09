import { tensor1d } from '@tensorflow/tfjs';

import { reshape2d } from '../model';

export default () => inputs => reshape2d(inputs.map(input => new Float32Array(input)));
