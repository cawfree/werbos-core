import { sequential } from "@tensorflow/tfjs";
import compose from "rippleware";

import { stimuli } from '../../shape';

const mergeMeta = (stimuli, meta) => {
  if (!Array.isArray(stimuli)) {
    throw new Error(`Expected array of stimuli, but encountered ${stimuli}.`);
  } else if (!Array.isArray(meta)) {
    throw new Error(`Expected array of meta, but encountered ${meta}.`);
  } else if (stimuli.length !== meta.length) {
    throw new Error(`Expected matching stimuli and meta length, but found ${stimuli.length}, ${meta.length}.`);
  }
  return [...Array(Math.max(stimuli.length, meta.length))]
    .map((_, i) => [stimuli[i], meta[i]]);
};

export default () => compose()
  .use((handle, { getState }) => handle(stimuli(getState()), (stimuli, { useGlobal, useMeta }) => useMeta(mergeMeta(stimuli, useMeta())) || sequential()));
