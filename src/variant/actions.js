import { typeCheck } from "type-check";

import { RECEIVE_VARIANT } from "./actionTypes";

const receiveVariant = id => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected string id, encountered ${id}.`);
  }
  return dispatch({
    type: RECEIVE_VARIANT,
    id,
  });
};

export const build = () => (dispatch, getState) => {
  
};
