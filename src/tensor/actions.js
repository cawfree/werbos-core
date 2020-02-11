import { typeCheck } from "type-check";
import { createTensor } from "./model";
import { RECEIVE_TENSOR } from "./actionTypes";

// TODO: Throw if the user has supplied a "type" property.
const receiveTensor = tensor => (dispatch, getState) => {
  if (!typeCheck("Object", tensor)) {
    throw new Error(`Expected [object Object], encountered ${tensor}.`);
  }
  const { id } = tensor;
  const { tensor: state } = getState();
  if (!(typeCheck("String", id) && id.length > 0)) {
    throw new Error("A tensor must be allocated using a non-empty string.");
  } else if (state.has(id)) {
    throw new Error(
      `A tensor with the id "${id}" has already been registered!`
    );
  }
  return dispatch({ ...createTensor(tensor), type: RECEIVE_TENSOR });
};

export const build = () => dispatch => {
  dispatch(receiveTensor(require("./defs/numeric-1d-normal.json")));
  dispatch(receiveTensor(require("./defs/numeric-1d-scalar.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-normal.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-onehot.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-scalar.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-threshold.json")));
  dispatch(receiveTensor(require("./defs/string-2d-onehot.json")));
};
