import compose, { pre } from "rippleware";
import { sequential } from "@tensorflow/tfjs";

import { Context } from "../../context";

export const id = "8MuyezD8KRVor4QNSrNZw";

//equivalent to: export default () => (stimuli, { useGlobal, useMeta }) => sequential();
export default () => sequential();

//export default () => (stimuli, { useGlobal, useMeta }) => {
//  //  // TODO: Should add some sanity checking about this.
//  const [a, b] = useMeta();
//  const [sa, sb] = stimuli;
//  useMeta(
//    [{ ...a, [stimuliMeta]: sa }, { ...b, [stimuliMeta]: sb }],
//  );
//  return sequential();
//};

//const createSequential = 
//
//// TODO: Need to add a hook to nest operation. (moize -> based on supplied meta!)
//export default () => compose()
//  .ctx(networkContext())
//  .pre(
//    ({ useGlobal }) => {
//      const { getState } = useGlobal();
//      return [
//        [Shape.Stimuli(getState()), createSequential()],
//      ];
//    },
//  );
