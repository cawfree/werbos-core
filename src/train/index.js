import * as tf from '@tensorflow/tfjs';

import { ModelTypeDef, TensorTypeDef } from '../shape';

export default () => burden => burden(
  `(${ModelTypeDef},${TensorTypeDef},${TensorTypeDef})`,
  ([{ $model: model }, { $tensor: xs }, { $tensor: ys }], { useState }) => {
    const [trained, setTrained] = useState(() => false);
    if (!trained) {
      return Promise
        .resolve()
        .then(() => setTrained(true))
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
        );
    }
    return Promise
      .resolve()
      .then(() => model.predict(xs, ys));
  },
);
