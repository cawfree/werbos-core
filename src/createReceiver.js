import { typeCheck } from "type-check";

import { model } from "./shape";
import { shouldReceive } from "./receiver";

export default ({ useGlobal, useKey }, params) => {

  // XXX: Exploits the fact that the first argument for each individual element
  //      of a parameter declaration is the evaluated arguments, which we wish
  //      to generate a key from.
  const computeKeyFor = ([argumentParams]) => useKey(argumentParams);

  const { getState } = useGlobal();

  return shouldReceive(getState(), computeKeyFor, ...params);
};
