import { typeCheck } from "type-check";

import { RECEIVE_RECEIVER } from "./actionTypes";

const receiveReceiver = id => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  }
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveReceiver("hello"));
};
