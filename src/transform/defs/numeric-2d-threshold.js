import { tensor1d, sub, scalar, sign, relu } from '@tensorflow/tfjs';
import otsu from "otsu";

import { reshape2d } from "../model";

//export default () => inputs => {
//  const features = tf.concat(
//    inputs
//    .map(
//      e => tf.tensor1d(e)
//      .sub(tf.scalar(otsu(e)))
//      .sign()
//      .relu(),
//    ),
//  );
//  const { shape } = features;
//  const [total] = shape;
//  return features.reshape([inputs.length, (total / inputs.length)]);
//};

export default () => inputs =>
  // TODO: This might be wrong! It's a different implementation from /master.
  //       If low prediction rates occur, the older model should be reused.
  reshape2d(
    inputs.map(input =>
      tensor1d(input)
        .sub(scalar(otsu(input)))
        .sign()
        .relu()
    )
  ).transpose();
