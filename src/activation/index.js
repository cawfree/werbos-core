import { typeCheck } from "type-check";

import {
  TYPEDEF_SCALAR_NUMERIC_2D,
  TYPEDEF_NORMALIZED_NUMERIC_2D,
} from '../wbf';

import { TensorTypeDef } from "../shape";

export const getInputActivation = (tensorTypeDef) => {
  if (typeCheck(TensorTypeDef, tensorTypeDef)) {
    const { type } = tensorTypeDef;
    if (type === TYPEDEF_NORMALIZED_NUMERIC_2D) {
      // TODO: Since our values go negative and positive, we probably need to find a better
      //       activation function.
      return 'relu';
    }
    throw new Error(`Unable to determine input activation for ${type}.`);
  }
  throw new Error(`Expected TensorTypeDef, but encountered ${tensorTypeDef}.`);
};

export const getTargetActivation = (tensorTypeDef) => {
  if (typeCheck(TensorTypeDef, tensorTypeDef)) {
    const { type } = tensorTypeDef;
    if (type === TYPEDEF_SCALAR_NUMERIC_2D) {
      // XXX: Should note, this is only really suitable for regression.
      return undefined;
    }
    throw new Error(`Unable to determine input activation for ${type}.`);
  }
  throw new Error(`Expected TensorTypeDef, but encountered ${tensorTypeDef}.`);

};
