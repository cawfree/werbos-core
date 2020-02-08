import { typeCheck } from "type-check";

import { TYPEDEF_SCALAR_NUMERIC_2D, TYPEDEF_ONE_HOT_NUMERIC_2D } from "../wbf";

import { TensorTypeDef } from "../shape";

export const getLoss = tensorTypeDef => {
  if (typeCheck(TensorTypeDef, tensorTypeDef)) {
    const { type } = tensorTypeDef;
    if (type === TYPEDEF_SCALAR_NUMERIC_2D) {
      return "meanSquaredError";
    } else if (type === TYPEDEF_ONE_HOT_NUMERIC_2D) {
      // TODO: This needs to be a function of the type.
      //       Being able to use binary for a symbol size of only two
      //       would be far better.
      return "categoricalCrossentropy";
    }
    throw new Error(`Unable to determine input activation for ${type}.`);
  }
  throw new Error(`Expected TensorTypeDef, but encountered ${tensorTypeDef}.`);
};
