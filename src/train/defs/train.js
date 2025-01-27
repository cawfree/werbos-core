import { train } from "@tensorflow/tfjs";
import { pre } from "rippleware";

import { Shape } from "../../shape";
import { loss, rectify } from "../model";

import { id as tensorMeta } from "../../meta/defs/tensor";
import { id as stimuliMeta } from "../../meta/defs/stimuli";

const defaultOptions = Object.freeze({
  batchSize: 128,
  epochs: 10,
  validationSplit: 0.0625,
  optimizer: train.rmsprop(1e-2),
  //shuffle: false,
});

const shouldTrain = options => (model, { useMeta, useState, useGlobal }) => {
  const { getState } = useGlobal();
  // TODO: We need a proper architecture for this after the build level.
  //       At the moment, we just keep re-recreating networks uselessly.
  const [cached, setCached] = useState(null);
  
  const [a, b] = useMeta();
  const { [stimuliMeta]: xs } = a;
  const { [stimuliMeta]: ys, [tensorMeta]: targetMeta } = b;

  const state = getState();
  if (!cached) {
    const { batchSize, epochs, optimizer, validationSplit, shuffle } = {
      ...defaultOptions,
      ...options
    };
    model.compile({ optimizer, loss: loss(state, targetMeta) });
    setCached(model);
    return model.fit(xs, ys, { batchSize, epochs, validationSplit, shuffle });
  }
  return rectify(state, cached.predict(xs), targetMeta);
};

export default (options = defaultOptions) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    return [
      [Shape.Model(getState()), shouldTrain(options)],
    ];
  },
);
