import { typeCheck } from "type-check";

import { RECEIVE_CONTEXT } from "./actionTypes";

import { id as baseId } from "./defs/base";

const receiveContext = id => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  }
  return dispatch({
    type: RECEIVE_CONTEXT,
    id,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveContext(baseId));
};
