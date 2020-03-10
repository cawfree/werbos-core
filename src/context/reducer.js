import initialState from "./model";

import { RECEIVE_CONTEXT } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_CONTEXT:
      const { id } = extras;
      // TODO: Implement proper meaningful context.
      return state.set(id, id);
    default:
      return state;
  }
};
