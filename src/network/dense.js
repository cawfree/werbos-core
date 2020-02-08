import * as tf from "@tensorflow/tfjs";

export default (props = {}) => (extraProps = {}) =>
  tf.layers.dense({
    ...props,
    ...extraProps
  });
