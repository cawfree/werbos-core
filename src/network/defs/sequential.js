import compose, { pre } from "rippleware";
import { sequential } from "@tensorflow/tfjs";

import { id as stimuliMeta } from "../../meta/defs/stimuli";
import { stimuli } from "../../shape";

const createSequential = () => (stimuli, { useGlobal, useMeta }) => {
  //  // TODO: Should add some sanity checking about this.
  const [a, b] = useMeta();
  const [sa, sb] = stimuli;
  useMeta(
    [{ ...a, [stimuliMeta]: sa }, { ...b, [stimuliMeta]: sb }],
  );
  return sequential();
};

// TODO: Need to add a hook to nest operation. (moize -> based on supplied meta!)
export default () => compose()
  .pre(
    ({ useGlobal }) => {
      const { getState } = useGlobal();
      return [
        [stimuli(getState()), createSequential()],
      ];
    },
  );
