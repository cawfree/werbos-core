import * as tf from '@tensorflow/tfjs';

import { Sequential as SequentialShape } from '../shape';

export const sequential = () => burden => burden(
  SequentialShape, () => console.log('ici'),
);

//export const dense = ({ ...props }) => ({ ...extraProps }) => tf.layers.dense(
//  {
//    ...props,
//    ...extraProps,
//  },
//);
