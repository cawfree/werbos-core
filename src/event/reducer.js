import initialState from "./model";

import { RECEIVE_EVENT } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_EVENT:
      const { id } = extras;
      // TODO: More useful configuration properties.
      return state.set(id, id);
    default:
      return state;
  }
};
