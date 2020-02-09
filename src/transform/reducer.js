import initialState from './model';
import { RECEIVE_TRANSFORM } from './actionTypes';

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_TRANSFORM:
      const { id, transform } = extras;
      return state.set(id, transform);
    default:
      return state;
  }
};
