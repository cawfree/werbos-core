import { typeCheck } from 'type-check';

import { getTransform } from './model';
import { RECEIVE_TRANSFORM } from './actionTypes';

import n1dn from '../tensor/defs/numeric-1d-normal.json';
import n1ds from '../tensor/defs/numeric-1d-scalar.json';
import n2dn from '../tensor/defs/numeric-2d-normal.json';
import n2do from '../tensor/defs/numeric-2d-onehot.json';
import n2ds from '../tensor/defs/numeric-2d-scalar.json';
import n2dt from '../tensor/defs/numeric-2d-threshold.json';
import s2do from '../tensor/defs/string-2d-onehot.json';

const receiveTransform = (id, func) => (dispatch, getState) => {
  const { transform } = getState();
  if (transform.has(id)) {
    throw new Error(`Attempted to overwrite reserved transform, ${id}.`);
  } else if (!typeCheck('Function', func)) {
    throw new Error(`Expected function, encountered ${func}.`);
  }
  return dispatch(
    {
      type: RECEIVE_TRANSFORM,
      id,
      transform: func,
    },
  );
};

const useTransform = (handle, { getState }, opts, ids) => ids
  .map(
    (id) => {
      const { tensor, transform } = getState();
      const { typeDef } = tensor.get(id);
      return handle(typeDef, transform.get(id)(opts));
    },
  );

export const oneHot = opts => (handle, store) => useTransform(handle, store, opts, [n2do.id, s2do.id]);
export const normalize = opts => (handle, store) => useTransform(handle, store, opts, [n1dn.id, n2dn.id]);
export const scalar = opts => (handle, store) => useTransform(handle, store, opts, [n1ds.id, n2ds.id]);
export const threshold = opts => (handle, store) => useTransform(handle, store, opts, [n2dt.id]);

export const build = () => (dispatch, getState) => {
  dispatch(receiveTransform(n1dn.id, () => () => console.log('numeric 1d normal')));
  dispatch(receiveTransform(n1ds.id, () => () => console.log('numeric 1d scalar')));
  dispatch(receiveTransform(n2dn.id, () => () => console.log('numeric 2d normal')));
  dispatch(receiveTransform(n2do.id, () => () => console.log('numeric 2d onehot')));
  dispatch(receiveTransform(n2ds.id, () => () => console.log('numeric 2d scalar')));
  dispatch(receiveTransform(n2dt.id, () => () => console.log('numeric 2d threshold')));
  dispatch(receiveTransform(s2do.id, () => () => console.log('string 2d onehot')));
};
