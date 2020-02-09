import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as tensor, build as tensors } from "./tensor";
import { reducer as transform, build as transforms } from "./transform";

export default () => {
  const store = createStore(
    combineReducers({ tensor, transform }),
    applyMiddleware(thunkMiddleware)
  );
  const { dispatch, getState } = store;

  dispatch(tensors());
  dispatch(transforms());

  return {
    ...store
  };
};
