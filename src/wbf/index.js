import { typeCheck } from 'type-check';

export const TYPEDEF_SCALAR_NUMERIC_1D = 'yrMU4_1DHwoG2e2F5ZwCX';
export const TYPEDEF_SCALAR_NUMERIC_2D = '0cu01ul1k2OspeYLmqok7';

export const TYPEDEF_NORMALIZED_NUMERIC_1D = '7tbIfwarzusYnQ_rYntrF';
export const TYPEDEF_NORMALIZED_NUMERIC_2D = '2x8OpCl6_W5kH4RBYreYE';

const typeDefs = Object
  .freeze(
    {
      [TYPEDEF_SCALAR_NUMERIC_1D]: {
        
      },
      [TYPEDEF_SCALAR_NUMERIC_2D]: {
        
      },
      [TYPEDEF_NORMALIZED_NUMERIC_1D]: {
        
      },
      [TYPEDEF_NORMALIZED_NUMERIC_2D]: {
        
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
    throw new Error(`Encountered unsupported typeDef, ${typedef}.`);
  }
  throw new Error(`Expected [Object obj] fromOptions, but encountered ${fromOptions}.`);
};
