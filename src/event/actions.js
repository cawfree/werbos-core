import { typeCheck } from "type-check";

import { RECEIVE_EVENT } from "./actionTypes";

import { id as predictEventId } from "./defs/predict";
import { id as trainEventId } from "./defs/train";

const receiveEvent = id => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  }
  const { event: model } = getState();
  if (model.has(id)) {
    throw new Error(`Attempted to overwrite reserved id "${id}".`);
  }
  return dispatch({
    type: RECEIVE_EVENT,
    id,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveEvent(predictEventId));
  dispatch(receiveEvent(trainEventId));
};
