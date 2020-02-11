import { Map } from "immutable";

import modelShape from "./defs/model";
import stimuliShape from "./defs/stimuli";
import tensorShape from "./defs/tensor";

const [modelId] = modelShape;
const [stimuliId] = stimuliShape;
const [tensorId] = tensorShape;

const getShape = (state, id) => {
  const { shape } = state;
  if (shape.has(id)) {
    return shape.get(id);
  }
  throw new Error(
    `Attempted to get shape for id "${id}", but it does not exist.`
  );
};

export const model = state => getShape(state, modelId);
export const stimuli = state => getShape(state, stimuliId);
export const tensor = state => getShape(state, tensorId);

export default Map();
