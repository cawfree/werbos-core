import { typeCheck } from "type-check";
import compose, { noop } from "rippleware";

import { id as next } from "./next";

//const isNextAction = (e) => {
//  if (typeCheck("(Object)", e)) {
//
//  }
//  return false;
//};

export default () => compose()
  .all(
    [
      ['(Function)', () => 'got a next action'],
      ['*', noop()],
    ],
  );
