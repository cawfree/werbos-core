import { typeCheck } from "type-check";

import n2ds from "../tensor/defs/numeric-2d-scalar";

import { RECEIVE_RECTIFIER } from "./actionTypes";

export const receiveRectifier = (id, rectifier) => (dispatch, getState) => {
  const { rectify } = getState();
  if (!typeCheck('String', id)) {
    throw new Error(`Expected string id, encountered ${id}.`);
  } else if (!typeCheck('Function', rectifier)) {
    throw new Error(`A rectifier must be a function, but encountered ${rectifier}.`);
  } else if (rectify.has(id)) {
    throw new Error(`Attempted to assign a recitfier to id "${id}", but it was already reserved.`);
  }
  return dispatch(
    {
      type: RECEIVE_RECTIFIER,
      id,
      rectifier,
    },
  );
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveRectifier(n2ds.id, require('./defs/numeric-2d-scalar.js').default));
};
