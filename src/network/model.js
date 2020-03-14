import { Map } from "immutable";
import { typeCheck } from "type-check";
import compose from "rippleware";

import { Context } from "../context";
import { readOnly } from "../meta";
import { Shape } from "../shape";

import { id as sequentialId } from "./defs/sequential";
import { id as pretrainedId } from "./defs/pretrained";

import { id as stimuliMeta } from "../meta/defs/stimuli";

const { Network } = Context;
const { Stimuli } = Shape;

const networkContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Network);
};

export const useNetwork = (id, withOptions) => compose()
  .ctx(networkContext())
  .pre(
    ({ ...hooks }) => {
      const { useGlobal } = hooks;
      const { getState } = useGlobal();
      const { network: model } = getState();
      const createNetwork = model.get(id);
      if (typeCheck("Function", createNetwork)) {
        return [
          [
            Stimuli(getState()),
            (stimuli, { ...extraHooks }) => {
              const { useMeta } = extraHooks;
              const [a, b] = useMeta();
              const [sa, sb] = stimuli;
              useMeta([{ ...a, [stimuliMeta]: sa }, { ...b, [stimuliMeta]: sb }]);
              return createNetwork(withOptions)(
                stimuli,
                {
                  ...extraHooks,
                  useMeta: readOnly(useMeta),
                },
              );
            },
          ],
        ];
      }
      throw new Error(`The network "${id}" has not been registered.`); 
    },
  );

export const sequential = withOptions => useNetwork(sequentialId, withOptions);
export const pretrained = withOptions => useNetwork(pretrainedId, withOptions);

export default Map();
