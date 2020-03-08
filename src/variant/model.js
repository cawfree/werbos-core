import nanoid from "nanoid";
import { Map } from "immutable";
import { typeCheck } from "type-check";

// XXX: Defines the appropriate id mechanism based upon the specified arguments.
export const createVariant = (state, ...args) => {
  const { variant } = state;
  return Object.values(variant.toJS())
    .reduce(
      (id, [typeDef]) => {
        console.log('check',typeDef);
        console.log('against', ...args);
        if (typeCheck(typeDef, args)) {
          return 'Yeah found a layer dude!';
        }
        return id;
      },
      nanoid(),
    );
};

export default Map();
