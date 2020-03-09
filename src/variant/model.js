import nanoid from "nanoid";
import { Map } from "immutable";
import { typeCheck } from "type-check";

// XXX: Defines the appropriate id mechanism based upon the specified arguments.
export const createVariant = (state, ...args) => {
  const { variant } = state;
  const [stageAttributes] = args;
  return Object.entries(variant.toJS())
    .reduce(
      (id, [variantId, [typeDef, defineVariant]]) => {
        if (typeCheck(typeDef, stageAttributes)) {
          return defineVariant(state, ...args);
        }
        return id;
      },
      nanoid(),
    );
};

export default Map();
