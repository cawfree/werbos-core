import compose, { pre } from "rippleware";
import { sequential } from "@tensorflow/tfjs";

import { stimuli } from "../../shape";

const mergeMeta = (stimuli, meta) => {
  if (!Array.isArray(stimuli)) {
    throw new Error(`Expected array of stimuli, but encountered ${stimuli}.`);
  } else if (!Array.isArray(meta)) {
    throw new Error(`Expected array of meta, but encountered ${meta}.`);
  } else if (stimuli.length !== meta.length) {
    throw new Error(
      `Expected matching stimuli and meta length, but found ${stimuli.length}, ${meta.length}.`
    );
  }
  return [...Array(Math.max(stimuli.length, meta.length))].map((_, i) => [
    stimuli[i],
    meta[i]
  ]);
};

const createSequential = () => (stimuli, { useGlobal, useMeta }) => useMeta(mergeMeta(stimuli, useMeta())) || sequential();

export default () => compose()
  .pre(
    ({ useGlobal }) => {
      const { getState } = useGlobal();
      return [
        [stimuli(getState()), createSequential()],
      ];
    },
  );
