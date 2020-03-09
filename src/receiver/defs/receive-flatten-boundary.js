import { Variant } from "../../variant";

const { Layer } = Variant;

export const id = '_XZJdQ2orEy4NuMcDho35';

export default (state, computeKeyFor, ...stages) => {
  stages.map(
    (stage) => {
      const { variant: variantId } = computeKeyFor(stage);
      if (variantId === Layer) {
        console.log("Found a layer!");
      }
    },
  );
  return stages;
};
