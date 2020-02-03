import * as tf from "@tensorflow/tfjs";

import { Sequential as SequentialShape } from "../shape";

const createSequentialFromLayers = (...layers) => {
  if (Array.isArray(layers) && layers.length >= 2) {
    return layers
      .reduce(
        (model) => {
          return model;
        },
        tf.sequential(),
      );
  }
  throw new Error(
    'A sequential model requires at least two processing layers (an input layer, and an output layer).',
  );
};

export const sequential = (...layers) => burden =>
  burden(SequentialShape, ([xs, ys], { useState }) => {
    // XXX: The model is cached to support re-use.
    const [model] = useState(() => createSequentialFromLayers(...layers));
    return model;
  });

// TODO: Requires a throwOnBadProps.
export const dense = ({ ...props } = {}) => ({ ...extraProps } = {}) =>
  tf.layers.dense({
    ...props,
    ...extraProps
  });
