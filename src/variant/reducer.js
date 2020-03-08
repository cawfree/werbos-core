import { RECEIVE_VARIANT } from "./actionTypes";

import initialState from "./model";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_VARIANT:
      const { id, typeDef } = extras;
      return state.set(id, Object.freeze([typeDef]));
    default:
      return state;
  }
};
