import { typeCheck } from "type-check";

import { RECEIVE_RECEIVER } from "./actionTypes";

import flattenBoundary, { id as flattenBoundaryId } from "./defs/receive-flatten-boundary";

const receiveReceiver = (id, receiver) => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  } else if (!typeCheck("Function", receiver)) {
    throw new Error(`Expected Function receiver, encountered ${receiver}.`);
  }
  return dispatch({
    type: RECEIVE_RECEIVER,
    id,
    receiver,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveReceiver(flattenBoundaryId, flattenBoundary));
};
