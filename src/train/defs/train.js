import { train } from "@tensorflow/tfjs";

import { model } from "../../shape";
import { loss, rectify } from "../model";

const defaultOptions = Object.freeze({
  batchSize: 128,
  epochs: 10,
  validationSplit: 0.0625,
  optimizer: train.rmsprop(1e-2),
  shuffle: false,
});

export default (options = defaultOptions) => (handle, { getState }) =>
  handle(model(getState()), (model, { useMeta, useState, useGlobal }) => {
    const { getState } = useGlobal();
    // TODO: We need a proper architecture for this after the build level.
    //       At the moment, we just keep re-recreating networks uselessly.
    const [cached, setCached] = useState(null);
    const [[xs], [ys, targetMeta]] = useMeta();
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
  });
