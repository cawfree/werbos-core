import * as tf from '@tensorflow/tfjs';

import { ModelTypeDef, TensorTypeDef } from '../shape';

export default () => burden => burden(
  `(${ModelTypeDef},${TensorTypeDef},${TensorTypeDef})`,
  ([{ $model: model }, { $tensor: xs }, { $tensor: ys }]) => Promise
    .resolve()
    .then(
      () => {
        // TODO: Enforce loss/comp etc
        model.compile(
          {
            optimizer: tf.train.rmsprop(1e-2),
            loss: 'meanSquaredError',
            metrics: ['mae'],
          },
        );
        return model.fit(
          xs,
          ys,
          {
            batchSize: 256,
            epochs: 10,
          },
        );
      },
    ),
);
