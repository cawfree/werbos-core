import { typeCheck } from "type-check";

import { id as layerMeta } from "./defs/layer";
import { id as tensorMeta } from "./defs/tensor";
import { id as stimuliMeta } from "./defs/stimuli";

import { RECEIVE_META } from "./actionTypes";

const receiveMeta = (id, data = {}) => (dispatch, getState) => {
  const { meta } = getState();
  if (meta.has(id)) {
    throw new Error(`Attempted to overwrite reserved meta key, "${id}".`);
  } else if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  }
  return dispatch({
    type: RECEIVE_META,
    id,
    data,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveMeta(layerMeta, []));
  dispatch(receiveMeta(tensorMeta));
  dispatch(receiveMeta(stimuliMeta, []));
};
