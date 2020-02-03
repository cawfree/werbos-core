import { typeCheck } from 'type-check';

import { Tensor, Model } from "../shape";

export const TYPEDEF_SCALAR_NUMERIC_1D = 'yrMU4_1DHwoG2e2F5ZwCX';
export const TYPEDEF_SCALAR_NUMERIC_2D = '0cu01ul1k2OspeYLmqok7';

export const TYPEDEF_NORMALIZED_NUMERIC_1D = '7tbIfwarzusYnQ_rYntrF';
export const TYPEDEF_NORMALIZED_NUMERIC_2D = '2x8OpCl6_W5kH4RBYreYE';

export const TYPEDEF_MODEL = 'hT3OZP7a3FxlxKgFcoBvt';

const typeDefs = Object
  .freeze(
    {
      [TYPEDEF_SCALAR_NUMERIC_1D]: {
        build(options) {
          return options;
        },
      },
      [TYPEDEF_SCALAR_NUMERIC_2D]: {
        build(options) {
          return options;
        },
      },
      [TYPEDEF_NORMALIZED_NUMERIC_1D]: {
        build(options) {
          return options;
        },
      },
      [TYPEDEF_NORMALIZED_NUMERIC_2D]: {
        build(options) {
          return options;
        },
      },
      [TYPEDEF_MODEL]: {
        build(options) {
          return options;
        },
      },
    },
  );

export const typeDef = (type, fromOptions = {}) => {
  if (!!fromOptions && typeCheck('Object', fromOptions)) {
    if (Object.keys(typeDefs).indexOf(type) >= 0) {
      const { [type]: { build } } = typeDefs;
      if (typeCheck('Function', build)) {
        return {
          type,
          ...build(fromOptions),
        };
      }
      throw new Error(`Missing build() function for typeDef ${type}`);
    }
    throw new Error(`Encountered unsupported typeDef, ${typeDef}.`);
  }
  throw new Error(`Expected [Object obj] fromOptions, but encountered ${fromOptions}.`);
};

export const tensorTypeDef = (type, $tensor, fromOptions = {}) => {
  if (typeCheck(Tensor, $tensor)) {
    if (typeCheck('Object', fromOptions)) {
      return typeDef(
        type,
        {
          ...fromOptions,
          $tensor,
        },
      );
    }
    throw new Error(`Expected [Object obj] options, but encountered ${fromOptions}.`);
  }
  throw new Error("A tensorTypeDef must declare a supporting tensor.");
};

export const modelTypeDef = ($model, fromOptions = {}) => {
  if (typeCheck(Model, $model)) {
    if (typeCheck('Object', fromOptions)) {
      return typeDef(
        TYPEDEF_MODEL,
        {
          ...fromOptions,
          $model,
        },
      );
    }
    throw new Error(`Expected [Object obj] options, but encountered ${fromOptions}.`);
  }
  throw new Error("A modelTypeDef must declare a supporting model.");
};
