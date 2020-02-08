import { typeCheck } from "type-check";
import { createTensor } from "./model";
import { RECEIVE_TENSOR } from "./actionTypes";

// TODO: Throw if the user has supplied a "type" property.
const receiveTensor = tensor => (dispatch, getState) => {
  if (typeCheck("Object", tensor)) {
    const { id } = tensor;
    if (typeCheck("String", id) && id.length > 0) {
      const { tensor: state } = getState();
      if (!state.has(id)) {
        return dispatch({ ...createTensor(tensor), type: RECEIVE_TENSOR });
      }
      throw new Error(
        `A tensor with the id "${id}" has already been registered!`
      );
    }
    throw new Error("A tensor must be allocated using a non-empty string.");
  }
};

export const initializeTensors = () => dispatch => {
  dispatch(receiveTensor(require("./defs/numeric-1d-normal.json")));
  dispatch(receiveTensor(require("./defs/numeric-1d-scalar.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-normal.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-onehot.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-scalar.json")));
  dispatch(receiveTensor(require("./defs/numeric-2d-threshold.json")));
  dispatch(receiveTensor(require("./defs/string-2d-onehot.json")));
};
