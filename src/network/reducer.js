import initialState from "./model";

import { RECEIVE_NETWORK } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_NETWORK:
      const { id, network } = extras;
      return state.set(id, network);
    default:
      return state;
  }
};
