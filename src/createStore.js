import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as layer, build as layers } from "./layer";
import { reducer as network, build as networks } from "./network";
import { reducer as shape, build as shapes } from "./shape";
import { reducer as tensor, build as tensors } from "./tensor";
import { reducer as transform, build as transforms } from "./transform";

export default () => {
  const store = createStore(
    combineReducers({ layer, network, shape, tensor, transform }),
    applyMiddleware(thunkMiddleware)
  );

  const { dispatch } = store;

  dispatch(layers());
  dispatch(shapes());
  dispatch(tensors());
  dispatch(transforms());
  dispatch(networks());

  return { ...store };
};
