import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { reducer as tensor, initializeTensors } from "./tensor";

export default () => {
  const store = createStore(
    combineReducers({ tensor }),
    applyMiddleware(thunkMiddleware)
  );
  const { dispatch, getState } = store;
  dispatch(initializeTensors());
  console.log(JSON.stringify(getState()));
  return {
    ...store
  };
};
