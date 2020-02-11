import initialState from "./model";

import { RECEIVE_SHAPE } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_SHAPE:
      const { id, shape } = extras;
      return state.set(id, shape);
    default:
      return state;
  }
};
