import { typeCheck } from "type-check";

import { RECEIVE_SHAPE } from "./actionTypes";

const receiveShape = shape => (dispatch, getState) => {
  if (typeCheck('(String,String)', shape)) {
    const { shape: model } = getState();
    const [id, def] = shape;
    if (id.length <= 0) {
      throw new Error(`Expected non-empty string id, but encountered "${id}".`);
    } else if (model.has(id)) {
      throw new Error(`Attempted to allocate a shape using id "${id}", but it has already been reserved.`);
    }
    return dispatch({ type: RECEIVE_SHAPE, id, shape: def });
  }
  throw new Error(`Expected (String, String) shape, but encountered ${shape}.`);
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveShape(require('./defs/model.json')));
  dispatch(receiveShape(require('./defs/stimuli.json')));
  dispatch(receiveShape(require('./defs/tensor.json')));
};
