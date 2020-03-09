import { typeCheck } from "type-check";

import { RECEIVE_VARIANT } from "./actionTypes";

import layerVariant, { id as layer, typeDef as layerTypeDef } from "./defs/layer";

const receiveVariant = (id, typeDef, variant) => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  } else if (!typeCheck("String", typeDef)) {
    throw new Error(`Expected String typeDef, encountered ${typeDef}.`);
  } else if (!typeCheck("Function", variant)) {
    throw new Error(`Expected Function variant, encountered ${variant}.`);
  }
  return dispatch({
    type: RECEIVE_VARIANT,
    id,
    typeDef,
    variant,
  });
};

export const build = () => (dispatch, getState) => {
  // TODO: Need to define a format
  dispatch(receiveVariant(layer, layerTypeDef, layerVariant));
};
