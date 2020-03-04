import { typeCheck } from "type-check";
import { layers as Layers } from "@tensorflow/tfjs";

import { RECEIVE_LAYER } from "./actionTypes";
import { useLayer } from "./model";

import denseLayer, { id as denseId } from "./defs/dense";
import dropoutLayer, { id as dropoutId } from "./defs/dropout";
import conv2dLayer, { id as conv2dId } from "./defs/conv2d";

const { dense: Dense, dropout: Dropout, conv2d: Conv2D } = Layers;

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
  dispatch(receiveLayer(denseId, denseLayer, Dense));
  dispatch(receiveLayer(dropoutId, dropoutLayer, Dropout));
  dispatch(receiveLayer(conv2dId, conv2dLayer, Conv2D));
};

export const dense = options => useLayer(denseId, options);
export const dropout = options => useLayer(dropoutId, options);
export const conv2d = options => useLayer(conv2dId, options);
