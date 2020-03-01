import initialState from "./model";
import { RECEIVE_META } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_META:
      const { id } = extras;
      return state.set(id, Object.freeze({}));
    default:
      return state;
  }
};
