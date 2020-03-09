import { RECEIVE_VARIANT } from "./actionTypes";

import initialState from "./model";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_VARIANT:
      const { id, typeDef, variant } = extras;
      return state.set(id, Object.freeze([typeDef, variant]));
    default:
      return state;
  }
};
