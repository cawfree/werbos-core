import initialState from "./model";
import { RECEIVE_META } from "./actionTypes";

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_META:
      const { id, data } = extras;
      return state.set(id, Object.freeze(data));
    default:
      return state;
  }
};
