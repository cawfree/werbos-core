export { build } from "./actions";
export { initialMeta, Meta } from "./model";
export { default as reducer } from "./reducer";

export const readOnly = useMeta => (...args) => {
  if (args.length > 0) {
    throw new Error(`Attempted to write via useMeta(), but this operation is not permitted within this scope.`);
  }
  return useMeta(...args);
};
