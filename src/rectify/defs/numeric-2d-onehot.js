import { typeCheck } from "type-check";

import { oneHotRectify } from "../model";

export default (tensor, meta) => {
  const { sym } = meta;
  if (!typeCheck("[Number]", sym)) {
    throw new Error(
      `A one-hot numeric tensor must provide an array of symbols, but these aren't specified. Expected [Number], encountered ${sym}.`
    );
  }
  return oneHotRectify(tensor, sym);
};
