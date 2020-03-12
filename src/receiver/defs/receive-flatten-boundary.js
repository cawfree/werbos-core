import { pre } from "rippleware";

import { Variant } from "../../variant";
import { pooling, flatten } from "../../layer";

import { id as conv2dId } from "../../layer/defs/conv2d";
import { id as denseId } from "../../layer/defs/dense";
import { id as pooling2dId } from "../../layer/defs/pooling2d";

const { Layer } = Variant;

export const id = '_XZJdQ2orEy4NuMcDho35';

const insertPoolingAt = (stages, i) => [
  ...stages.slice(0, i),
  [
    [pooling()],
    e => e,
    null,
  ],
  ...stages.slice(i),
];

const insertFlattenAt = (stages, i) => [
  ...stages.slice(0, i),
  [
    [flatten()],
    e => e,
    null,
  ],
  ...stages.slice(i),
];

// TODO: Fix this, this is more like a generic dimension handler now
// XXX: Detects whether we need to insert a call to flatten() between two layers.
const flattenBoundary = (state, computeKeyFor, ...stages) => {
  for (let i = 1; i < stages.length; i += 1) {
    const stage = stages[i];
    const lastStage = stages[i - 1];

    const { variant: variantId, ...extras } = computeKeyFor(stage);
    const { variant: lastVariantId,  ...lastExtras } = computeKeyFor(lastStage);

    // XXX: Likely useful to abstract to model.
    if (variantId === Layer && lastVariantId === Layer) {
      const { id } = extras;
      const { id: lastId } = lastExtras;
      // XXX: Apply default pooling between successive convolution layers.
      if (id === conv2dId && lastId === conv2dId) {
        console.log('insert pooling!');
        return insertPoolingAt(stages, i);
      } else if (id === denseId && lastId === conv2dId) {
        console.log('insert flatten!');
        return insertFlattenAt(stages, i);
      }
    }
  }

  return stages;
};

export default flattenBoundary;
