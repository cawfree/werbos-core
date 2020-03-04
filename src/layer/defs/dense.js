import { typeCheck } from "type-check";

import { getLastActivation, getInputProps, getTargetProps } from "../model";

export const id = '6B_VwAeqe8dY8cJrKXGRR';

const defaultOptions = Object.freeze({});

const getHiddenProps = (state, inputDef, targetDef) => ({
  // XXX: Assume the activation of the previous layer.
  activation: getLastActivation(inputDef),
});

export default (options = defaultOptions) => (model, { useGlobal, useMeta, useTopology }) => {
  const [index, length] = useTopology();
  const firstLayer = index === 1;
  const targetLayer = index === length - 1;
  const meta = useMeta();
  const [inputDef, targetDef] = meta;
  const { getState } = useGlobal();
  const state = getState();

  const lastActivation = ((!firstLayer) && getLastActivation(inputDef)) || undefined;

  return {
    // XXX: Allow hidden layers to have their dynamic props overrided,
    //      since these are genuine guesses.
    ...((!(firstLayer || targetLayer)) ? getHiddenProps(state, inputDef, targetDef) : {}),
    ...{
      ...defaultOptions,
      ...options,
    },
    ...(firstLayer ? getInputProps(state, inputDef) : {}),
    ...(targetLayer ? getTargetProps(state, targetDef) : {}),
  };
  q
};
