import { typeCheck } from "type-check";
import { layers } from "@tensorflow/tfjs";

import { model } from "../../shape";

const { dropout } = layers;

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

export default (options = defaultOptions) => (handle, { getState }) =>
  handle(model(getState()), (model, { useGlobal, useMeta, useTopology }) => {
    model.add(
      dropout({...defaultOptions, ...options }),
    );

    useMeta(useMeta());

    return model;
  });
