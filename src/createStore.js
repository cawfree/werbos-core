import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as layer, build as layers } from "./layer";
import { reducer as network, build as networks } from "./network";
import { reducer as rectify, build as rectifiers } from "./rectify";
import { reducer as shape, build as shapes } from "./shape";
import { reducer as tensor, build as tensors } from "./tensor";
import { reducer as train, build as training } from "./train";
import { reducer as transform, build as transforms } from "./transform";

export default () => {
  const store = createStore(
    combineReducers({
      layer,
      network,
      rectify,
      shape,
      tensor,
      train,
      transform
    }),
    applyMiddleware(thunkMiddleware)
  );

  const { dispatch } = store;

  dispatch(layers());
  dispatch(shapes());
  dispatch(tensors());
  dispatch(training());
  dispatch(transforms());
  dispatch(networks());
  dispatch(rectifiers());

  return { ...store };
};
