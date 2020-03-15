import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as context, build as contexts } from "./context";
import { reducer as event, build as events } from "./event";
import { reducer as layer, build as layers } from "./layer";
import { reducer as meta, build as metas } from "./meta";
import { reducer as network, build as networks } from "./network";
import { reducer as receiver, build as receivers } from "./receiver";
import { reducer as rectify, build as rectifiers } from "./rectify";
import { reducer as shape, build as shapes } from "./shape";
import { reducer as stream, build as streams } from "./stream";
import { reducer as tensor, build as tensors } from "./tensor";
import { reducer as train, build as training } from "./train";
import { reducer as transform, build as transforms } from "./transform";
import { reducer as variant, build as variants } from "./variant";

export default () => {
  const store = createStore(
    combineReducers({
      context,
      event,
      layer,
      meta,
      network,
      receiver,
      rectify,
      shape,
      stream,
      tensor,
      train,
      transform,
      variant
    }),
    applyMiddleware(thunkMiddleware)
  );

  const { dispatch } = store;

  dispatch(contexts());
  dispatch(events());
  dispatch(layers());
  dispatch(metas());
  dispatch(receivers());
  dispatch(rectifiers());
  dispatch(shapes());
  dispatch(streams());
  dispatch(tensors());
  dispatch(training());
  dispatch(transforms());
  dispatch(networks());
  dispatch(variants());

  return { ...store };
};
