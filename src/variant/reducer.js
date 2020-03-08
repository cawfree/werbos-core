import { RECEIVE_VARIANT } from "./actionTypes";

import initialState from "./model";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_VARIANT:
      const { id } = extras;
      return state.set(id, 'to something');
    default:
      return state;
  }
};
