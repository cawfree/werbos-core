import { typeCheck } from "type-check";

export const id = 'VJ5GiJnZ6-Fv49mUG3W0J';

const defaultOptions = Object.freeze({
  limit: 1,
});

export default (...args) => {
  if (args.length === 1) {
    const [first] = args;
    if (typeCheck("Object", first)) {
      throw new Error('🤷 Initializing a call to next() with an options object is not yet supported.');
    } else if (!Number.isInteger(first) || first <= 0) {
      throw new Error(`Expected positive integer limit, encountered ${first}.`);
    }
    return [id, Object.freeze({ ...defaultOptions, limit: first })];
  }
  return [ id, defaultOptions];
};
