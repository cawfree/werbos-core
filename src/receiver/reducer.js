import initialState from "./model";

import { RECEIVE_RECEIVER } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_RECEIVER:
      const { id } = extras;
      return state.set(id, "some receiver declaration");
    default:
      return state;
  }
};
