import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as layer, build as layers } from "./layer";
import { reducer as meta, build as metas } from "./meta";
import { reducer as network, build as networks } from "./network";
import { reducer as rectify, build as rectifiers } from "./rectify";
import { reducer as shape, build as shapes } from "./shape";
import { reducer as tensor, build as tensors } from "./tensor";
import { reducer as train, build as training } from "./train";
import { reducer as transform, build as transforms } from "./transform";
import { reducer as variant, build as variants } from "./variant";

export default () => {
  const store = createStore(
    combineReducers({
      layer,
      meta,
      network,
      rectify,
      shape,
      tensor,
      train,
      transform,
      variant
    }),
    applyMiddleware(thunkMiddleware)
  );

  const { dispatch } = store;

  dispatch(layers());
  dispatch(metas());
  dispatch(shapes());
  dispatch(tensors());
  dispatch(training());
  dispatch(transforms());
  dispatch(networks());
  dispatch(rectifiers());
  dispatch(variants());

  return { ...store };
};
