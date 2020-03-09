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

    if (variantId === Layer && lastVariantId === Layer) {
      console.log('found two connecting layers');
    }
  }

  return stages;
};

export default flattenBoundary;

//export default (state, computeKeyFor, ...stages) => {
//  const stagesToReturn = [...stages];
//  
//  for (let i = 1; i < stagesToReturn.length; i += 1) {
//    const lastStage = stagesToReturn[i - 1];
//    const stage = stagesToReturn
//
//  }
//
//
//  //stages.map(
//  //  (stage) => {
//  //    const { variant: variantId } = computeKeyFor(stage);
//  //    if (variantId === Layer) {
//  //      console.log("Found a layer!");
//  //    }
//  //  },
//  //);
//  //return stages;
//};
