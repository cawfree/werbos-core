import * as tf from '@tensorflow/tfjs';
import { typeCheck } from 'type-check';

import { ModelTypeDef, TensorTypeDef } from '../shape';
import { getLoss } from '../loss';

const defaultOptions = Object
  .freeze(
    {
      batchSize: 128,
      epochs: 10,
      validationSplit: 0.0625,
      //metrics: ['mae'],
      optimizer: tf.train.rmsprop(1e-2),
    },
  );

export default (options = defaultOptions) => burden => burden(
  `(${ModelTypeDef},${TensorTypeDef},${TensorTypeDef})`,
  ([{ $model: model }, { $tensor: xs }, yt], { useState }) => {
    if (typeCheck('Object', options)) {
      const { $tensor: ys } = yt;
      const [trained, setTrained] = useState(() => false);
      if (!trained) {
        const {
          batchSize,
          epochs,
          optimizer,
          validationSplit,
          //metrics, // TODO: should extend
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
                  loss: getLoss(yt),
                  //metrics,
                },
              );
              return model.fit(
                xs,
                ys,
                {
                  batchSize,
                  epochs,
                  validationSplit,
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
