import * as tf from '@tensorflow/tfjs';
import { typeCheck } from 'type-check';

import { ModelTypeDef, TensorTypeDef } from '../shape';

const defaultOptions = Object
  .freeze(
    {
      batchSize: 128,
      epochs: 10,
      loss: 'meanSquaredError',
      metrics: ['mae'],
      optimizer: tf.train.rmsprop(1e-2),
    },
  );

export default (options = defaultOptions) => burden => burden(
  `(${ModelTypeDef},${TensorTypeDef},${TensorTypeDef})`,
  ([{ $model: model }, { $tensor: xs }, { $tensor: ys }], { useState }) => {
    if (typeCheck('Object', options)) {
      const [trained, setTrained] = useState(() => false);
      if (!trained) {
        const {
          batchSize,
          epochs,
          optimizer,
          loss,
          metrics,
          // TODO: Use deepMerge
        } = { ...defaultOptions, ...options };
        return Promise
          .resolve()
          .then(() => setTrained(true))
          .then(
            () => {
              // TODO: Enforce loss/comp etc
              model.compile(
                {
                  optimizer,
                  loss,
                  metrics,
                },
              );
              return model.fit(
                xs,
                ys,
                {
                  batchSize,
                  epochs,
                },
              );
            },
          );
      }
      return Promise
        .resolve()
        .then(() => model.predict(xs, ys));
    }
    return Promise
      .reject(
        new Error(
          `Expected [Object obj] options, encountered ${options}.`,
        ),
      );
  },
);
