import { train, layers, slice, split, concat } from "@tensorflow/tfjs";
import { model as clone } from "tfjs-clone";
import { pre } from "rippleware";

import { loss, rectify } from "../model";
import { model } from "../../shape";

const { average } = layers;

// TODO: use random, etc
const defaultOptions = Object.freeze({
  k: 3,
  optimizer: train.rmsprop(1e-2),
  batchSize: 64,
  epochs: 10,
  //shuffle: false,
});

const kfold = options => (model, { useMeta, useState, useGlobal }) => {
  const {
    k,
    optimizer,
    batchSize,
    epochs,
    shuffle,
  } = { ...defaultOptions, ...options };

  if (!Number.isInteger(k) || k < 2) {
    return Promise.reject(new Error(`Expected positive integer k, but encountered ${k}.`));
  }
  
  const { getState } = useGlobal();
  const state = getState();

  const [[xs], [ys, targetMeta]] = useMeta();

  const [cached, setCached] = useState(null);

  if (!cached) {
    const { shape: [numberOfSamples] } = xs;

    const bufferLength = numberOfSamples - (numberOfSamples % k);
    const samplesPerModel =  bufferLength / k;

    const xss = slice(xs, 0, bufferLength);
    const yss = slice(ys, 0, bufferLength);

    const xsss = split(xss, k);
    const ysss = split(yss, k);

    return Promise
      .all(
        [...Array(k)]
          .map(() => clone(model)),
      )
      .then(
        (models) => {
          models.forEach(
            model => model.compile({
              optimizer,
              loss: loss(state, targetMeta),
            }),
          );
          setCached(models);
          return Promise
            .all(
              models.map(
                (model, i) => {
                  const [xv, yv] = [xsss[i], ysss[i]];
                  const xs = concat(xsss.filter((_, j) => (j !== i)));
                  const ys = concat(ysss.filter((_, j) => (j !== i)));
                  return model.fit(
                    xs,
                    ys,
                    {
                      batchSize,
                      epochs,
                      shuffle,
                      validationData: [xv, yv],
                    },
                  );
                },
              ),
            );
        },
      );
  }
  // XXX: All models can predict the input data directly without segmentation.
  return Promise
    .all(cached.map(model => Promise.resolve(model.predict(xs))))
    .then(results => average().apply(results))
    .then(result => rectify(state, result, targetMeta));
};

export default (options = defaultOptions) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    return [
      [model(getState()), kfold(options)],
    ];
  },
);
