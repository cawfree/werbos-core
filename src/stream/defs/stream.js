import { typeCheck } from "type-check";
import compose from "rippleware";

import { id as next } from "./next";

const isNextAction = (e) => {
  if (typeCheck("(Object)", e)) {

  }
  return false;
};

export default () => compose()
  .all(
    [
      [isNextAction, () => 'got a next action'],
      ['*', e => e],
    ],
  );
