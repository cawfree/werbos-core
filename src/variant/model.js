import nanoid from "nanoid";
import { Map } from "immutable";

export const createVariant = (...args) => {
  console.log('will var for', ...args);
  return nanoid();
};

export default Map();
