import * as tf from '@tensorflow/tfjs';

import { Sequential } from "../shape";
import { getInputActivation, getTargetActivation } from "../activation";

const getInputShape = shape => shape.slice(1);
const getTargetUnits = shape => shape[shape.length - 1];

export default (...layers) => burden => burden(
  Sequential,
  ([xs, ys], { useState }) => {
    if (layers.length >= 2) {
      const { $tensor: { shape: inputShape } } = xs;
      const { $tensor: { shape: outputShape } } = ys;
      const [model] = useState(
        () => layers.reduce(
          (m, createLayer, i, orig) => {
            const isFirstLayer = i === 0;
            const isLastLayer = i === orig.length  - 1;
            // TODO: Need to warn on properties that will be overrided.
            m.add(
              createLayer(
                {
                  ...(
                    isFirstLayer ? {
                      inputShape: getInputShape(inputShape),
                      activation: getInputActivation(xs),
                    } : {}
                  ),
                  ...(
                    isLastLayer ? {
                      units: getTargetUnits(outputShape),
                      activation: getTargetActivation(ys),
                    } : {}
                  ),
                },
              ),
            );
            return m;
          },
          tf.sequential(),
        ),
      );
      return model;
    }
    throw new Error("A sequential network requires a minimum of two layers; an input layer, and an output layer.");
  },
);
