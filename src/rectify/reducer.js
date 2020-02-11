import initialState from "./model";

import { RECEIVE_RECTIFIER } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_RECTIFIER:
      const { id, rectifier } = extras;
      return state.set(id, rectifier);
    default:
      return state;
  }
};
