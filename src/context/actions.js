import { typeCheck } from "type-check";

import { RECEIVE_CONTEXT } from "./actionTypes";

import { id as baseId } from "./defs/base";
import { id as networkId } from "./defs/network";
import { id as streamId } from "./defs/stream";

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
  dispatch(receiveContext(networkId));
  dispatch(receiveContext(streamId));
};
