import initialState from "./model";

import { RECEIVE_RECEIVER } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_RECEIVER:
      const { id, receiver } = extras;
      return state.set(id, Object.freeze([receiver]));
    default:
      return state;
  }
};
