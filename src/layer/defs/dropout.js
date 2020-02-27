import { layers } from "@tensorflow/tfjs";
import { typeCheck } from "type-check";
import { pre } from "rippleware";

import { model } from "../../shape";

const { dropout } = layers;

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

const createDropout = options => (model, { useGlobal, useMeta, useTopology }) => {
  model.add(
    dropout({...defaultOptions, ...options }),
  );
  return model;
}

export default (options = defaultOptions) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    return [
      [model(getState()), createDropout(options)],
    ];
  },
);
