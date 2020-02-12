import { typeCheck } from "type-check";

import { oneHotRectify } from "../model";

export default (tensor, meta) => {
  const { sym } = meta;
  if (!typeCheck("[String]", sym)) {
    throw new Error(
      `A one-hot string tensor must provide an array of symbols, but these aren't specified. Expected [String], encountered ${sym}.`
    );
  }
  return oneHotRectify(tensor, sym);
};
