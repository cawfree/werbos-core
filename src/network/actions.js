import { typeCheck } from "type-check";

import sequential, { id as sequentialId } from "./defs/sequential";
import pretrained, { id as pretrainedId } from "./defs/pretrained";

import { RECEIVE_NETWORK } from "./actionTypes";

const receiveNetwork = (id, network) => (dispatch, getState) => {
  if (!typeCheck("String", id)) {
    throw new Error(`Expected String id, encountered ${id}.`);
  } else if (!typeCheck("Function", network)) {
    throw new Error(`Expected Function network, encountered ${network}.`);
  }
  const { network: model } = getState();
  if (model.has(id)) {
    throw new Error(`Attempted to overwrite reserved id, "${id}".`);
  }
  return dispatch({
    type: RECEIVE_NETWORK,
    id,
    network,
  });
};

export const build = () => (dispatch, getState) => {
  dispatch(receiveNetwork(sequentialId, sequential));
  dispatch(receiveNetwork(pretrainedId, pretrained));
};
