import { typeCheck } from "type-check";
import { layers as Layers } from "@tensorflow/tfjs";

import { RECEIVE_LAYER } from "./actionTypes";

import dense, { id as denseId } from "./defs/dense";
import dropout, { id as dropoutId } from "./defs/dropout";

const { dense: Dense, dropout: Dropout } = Layers;

const receiveLayer = (id, stage, layer) => (dispatch, getState) => {
  const { layer: model } = getState();
  if (!typeCheck("String", id) || id.length <= 0) {
    throw new Error(`Expected non-empty String id, encountered ${id}.`);
  } else if (model.has(id)) {
    throw new Error(`Attempted to overwrite reserved id, ${id}.`);
  } else if (Object.values(Layers).indexOf(layer) < 0) {
    throw new Error(`Expected a @tensorflow/tfjs layer, encountered ${layer}.`);
  } else if (!typeCheck("Function", stage)) {
    throw new Error(`Expected Function stage, encountered ${stage}.`);
  }
  return dispatch(
    {
      type: RECEIVE_LAYER,
      id,
      stage,
      layer,
    },
  );
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveLayer(denseId, dense, Dense));
  dispatch(receiveLayer(dropoutId, dropout, Dropout));
};
