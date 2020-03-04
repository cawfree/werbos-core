import { typeCheck } from "type-check";
import { layers as Layers } from "@tensorflow/tfjs";

import { RECEIVE_LAYER } from "./actionTypes";
import { useLayer } from "./model";

import denseLayer, { id as denseId } from "./defs/dense";
import dropoutLayer, { id as dropoutId } from "./defs/dropout";
// XXX: This also means that conv2d can actually just be conv().
import conv2dLayer, { id as conv2dId } from "./defs/conv2d";
import flattenLayer, { id as flattenId } from "./defs/flatten";
import poolingLayer, { id as poolingId } from "./defs/pooling";

const {
  dense: Dense,
  dropout: Dropout,
  conv2d: Conv2D,
  flatten: Flatten,
  // TODO: There is max pooling 1d, 2d. We should be able to abstract this into pooling().
  maxPooling2d: MaxPooling2D,
} = Layers;

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
  dispatch(receiveLayer(flattenId, flattenLayer, Flatten));
  dispatch(receiveLayer(poolingId, poolingLayer, MaxPooling2D));
};

export const dense = options => useLayer(denseId, options);
export const dropout = options => useLayer(dropoutId, options);
export const conv2d = options => useLayer(conv2dId, options);
export const flatten = options => useLayer(flattenId, options);
export const pooling = options => useLayer(poolingId, options);
