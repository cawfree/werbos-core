import * as tf from "@tensorflow/tfjs";

import { TYPEDEF_SCALAR_NUMERIC_2D, TYPEDEF_ONE_HOT_NUMERIC_2D } from "../wbf";

export default (outputProps, result) => {
  const { type, ...extras } = outputProps;
  if (type === TYPEDEF_SCALAR_NUMERIC_2D) {
    return result.dataSync();
  } else if (type === TYPEDEF_ONE_HOT_NUMERIC_2D) {
    const { sym } = extras;
    return tf
      .tidy(() =>
        tf
          .multinomial(tf.div(tf.log(tf.squeeze(result)), 1e-6), 1, null, false)
          .dataSync()
      )
      .map(e => sym[e]);
  }
  throw new Error(`Unsupported output type, ${type}.`);
};
