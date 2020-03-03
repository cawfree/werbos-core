import initialState from "./model";

import { RECEIVE_LAYER } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_LAYER:
      const { id, stage, layer } = extras;
      return state.set(id, Object.freeze([stage, layer]));
    default:
      return state;
  }
};
