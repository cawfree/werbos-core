import initialState from './model';
import { RECEIVE_TENSOR } from './actionTypes';

export default (state = initialState, { type, ...extras }) => {
  switch (type) {
    case RECEIVE_TENSOR: 
      const { id, tensor } = extras;
      return state.set(id, tensor);
    default:
      return state;
  }
};
