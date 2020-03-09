import nanoid from "nanoid";
import { Map } from "immutable";
import { typeCheck } from "type-check";

import { id as Layer } from "./defs/layer";

export const Variant = Object.freeze({
  Layer,
});


// XXX: Defines the appropriate id mechanism based upon the specified arguments.
export const createVariant = (state, ...args) => {
  const { variant } = state;
  const [stageAttributes] = args;
  return Object.entries(variant.toJS())
    .reduce(
      (id, [variantId, [typeDef, defineVariant]]) => {
        if (typeCheck(typeDef, stageAttributes)) {
          const def = defineVariant(state, ...args);
          if (!typeCheck("Object", def)) {
            throw new Error(`Expected Object variant definition, encountered ${def}.`);
          } else if (def.hasOwnProperty("variant")) {
            throw new Error(`A variant definition attempted to write to the "variant" property, but this is reserved.`);
          }
          // XXX: Computes the corresponding property.
          return {
            ...def,
            variant: variantId,
          };
        }
        return id;
      },
      nanoid(),
    );
};

export default Map();
