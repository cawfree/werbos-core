import { typeCheck } from "type-check";

import { RECEIVE_META } from "./actionTypes";

const receiveMeta = id => (dispatch, getState) => {
  const { meta } = getState();
  if (meta.has(id)) {
    throw new Error(`Attempted to overwrite reserved meta key, "${id}".`);
  } else if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  }
  return dispatch({
    type: RECEIVE_META,
    id,
  });
};

export const build = () => (dispatch, getState) => {

};
