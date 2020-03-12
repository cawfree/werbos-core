import { Map } from "immutable";

import modelShape from "./defs/model";
import nextShape from "./defs/next";
import stimuliShape from "./defs/stimuli";
import tensorShape from "./defs/tensor";

const [modelId] = modelShape;
const [stimuliId] = stimuliShape;
const [tensorId] = tensorShape;
const [nextId] = nextShape;

const getShape = (state, id) => {
  const { shape } = state;
  if (shape.has(id)) {
    return shape.get(id);
  }
  throw new Error(
    `Attempted to get shape for id "${id}", but it does not exist.`
  );
};

export const Model = state => getShape(state, modelId);
export const Next = state => getShape(state, nextId);
export const Stimuli = state => getShape(state, stimuliId);
export const Tensor = state => getShape(state, tensorId);

export const Shape = Object.freeze({
  Model,
  Next,
  Stimuli,
  Tensor,
});

export default Map();
