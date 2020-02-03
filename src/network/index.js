import * as tf from "@tensorflow/tfjs";

import { Sequential as SequentialShape } from "../shape";

const createSequentialFromLayers = (xs, ys, ...layers) => {
  if (Array.isArray(layers) && layers.length >= 2) {
    return layers
      .reduce(
        (model, layer, i, orig) => {
          const isInputLayer = (i === 0);
          const isTargetLayer = (i === orig.length - 1);
          model.add(
            layer(
              {
                ...(
                  isInputLayer ? {
                    inputShape: xs.shape.slice(1),
                  } : {}
                ),
                ...(
                  isTargetLayer ? {
                    units: ys.shape[ys.shape.length - 1],
                  } : {}
                ),
              },
            ),
          );

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
    const [model] = useState(() => createSequentialFromLayers(xs, ys, ...layers));
    return model;
  });

// TODO: Requires a throwOnBadProps.
export const dense = ({ ...props } = {}) => ({ ...extraProps } = {}) =>
  tf.layers.dense({
    ...props,
    ...extraProps
  });
