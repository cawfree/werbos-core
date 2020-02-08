import { typeCheck } from 'type-check';
import { createTensor } from './model';
import { RECEIVE_TENSOR } from './actionTypes';

const receiveTensor = (id, tensor) => (dispatch, getState) => {
  if (typeCheck('String', id) && id.length > 0) {
    const { tensor: state } = getState();
    if (!state.has(id)) {
      return dispatch({ type: RECEIVE_TENSOR, id, tensor });
    }
    throw new Error(`A tensor with the id "${id}" has already been registered!`);
  }
  throw new Error('A tensor must be allocated using a non-empty string.');
};
 
/* https://nanoid.dev */
const TYPEDEF_SCALAR_NUMERIC_1D = "yrMU4_1DHwoG2e2F5ZwCX";
const TYPEDEF_SCALAR_NUMERIC_2D = "0cu01ul1k2OspeYLmqok7";
const TYPEDEF_NORMALIZED_NUMERIC_1D = "7tbIfwarzusYnQ_rYntrF";
const TYPEDEF_NORMALIZED_NUMERIC_2D = "2x8OpCl6_W5kH4RBYreYE";
const TYPEDEF_ONE_HOT_STRING_2D = "Za28j6s_78OReC4Apf6C_";
const TYPEDEF_ONE_HOT_NUMERIC_2D = "aNSO-fJeiHg3Z8xpkoXa8";
const TYPEDEF_THRESHOLD_NUMERIC_2D = "svPsrxn5fm--RugHAyeK1";

export const initializeTensors = () => (dispatch, getState) => {
  dispatch(receiveTensor(TYPEDEF_SCALAR_NUMERIC_1D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_SCALAR_NUMERIC_2D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_NORMALIZED_NUMERIC_1D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_NORMALIZED_NUMERIC_2D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_ONE_HOT_STRING_2D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_ONE_HOT_NUMERIC_2D, createTensor()));
  dispatch(receiveTensor(TYPEDEF_THRESHOLD_NUMERIC_2D, createTensor()));
};
