import { pre } from "rippleware";

import { Variant } from "../../variant";

const { Layer } = Variant;

export const id = '_XZJdQ2orEy4NuMcDho35';

// XXX: Detects whether we need to insert a call to flatten() between two layers.
const flattenBoundary = (state, computeKeyFor, ...stages) => {
  for (let i = 1; i < stages.length; i += 1) {
    const stage = stages[i];
    const lastStage = stages[i - 1];

    const { variant: variantId, ...extras } = computeKeyFor(stage);
    const { variant: lastVariantId,  ...lastExtras } = computeKeyFor(lastStage);

    // XXX: Likely useful to abstract to model.
    if (variantId === Layer && lastVariantId === Layer) {
      return [
        ...stages.slice(0, i),
        [
          [e => {
            console.log('inside your layer');
            return e;
          }],
          e => e,
          null,
        ],
        ...stages.slice(i),
      ];
    }
  }

  return stages;
};

export default flattenBoundary;
