import { typeCheck } from "type-check";

import { RECEIVE_VARIANT } from "./actionTypes";

import { id as layer, typeDef as layerTypeDef } from "./defs/layer";

const receiveVariant = (id, typeDef) => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected string id, encountered ${id}.`);
  } else if (!typeCheck("String", typeDef)) {
    throw new Error(`Expected string typeDef, encountered ${typeDef}.`);
  }
  return dispatch({
    type: RECEIVE_VARIANT,
    id,
    typeDef,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveVariant(layer, layerTypeDef));
};
