import { typeCheck } from "type-check";
import { train } from "@tensorflow/tfjs";

import { model } from "../../shape";

const defaultOptions = Object.freeze({
  batchSize: 128,
  epochs: 10,
  validationSplit: 0.0625,
  optimizer: train.rmsprop(1e-2)
});

const loss = (state, targetMeta) => {
  const { tensor: typeDef } = targetMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor } = state;
  const { loss } = tensor.get(typeDef);
  if (!typeCheck("String", loss)) {
    throw new Error(
      `A loss function has not been specified for tensor "${typeDef}". Expected string, encountered ${loss}.`
    );
  }
  return loss;
};

const rectify = (state, ys, targetMeta) => {
  const { rectify } = state;
  const { tensor: typeDef } = targetMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const shouldRectify = rectify.get(typeDef);
  if (!typeCheck("Function", shouldRectify)) {
    throw new Error(
      `Expected function rectifier, but encountered ${shouldRectify}.`
    );
  }
  return shouldRectify(ys, targetMeta);
};

export default (options = defaultOptions) => (handle, { getState }) =>
  handle(model(getState()), (model, { useMeta, useState, useGlobal }) => {
    const { getState } = useGlobal();
    // TODO: We need a proper architecture for this after the build level.
    //       At the moment, we just keep re-recreating networks uselessly.
    const [cached, setCached] = useState(null);
    const [[xs], [ys, targetMeta]] = useMeta();
    const state = getState();
    if (!cached) {
      const { batchSize, epochs, optimizer, validationSplit } = {
        ...defaultOptions,
        ...options
      };
      model.compile({ optimizer, loss: loss(state, targetMeta) });
      model.fit(xs, ys, { batchSize, epochs, validationSplit });
      setCached(model);
      return model;
    }
    return rectify(state, cached.predict(xs), targetMeta);
  });
