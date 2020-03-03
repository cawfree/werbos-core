import { typeCheck } from "type-check";

import { getLastActivation } from "../model";

import { id as tensorMeta } from "../../meta/defs/tensor";
import { id as stimuliMeta } from "../../meta/defs/stimuli";

export const id = '6B_VwAeqe8dY8cJrKXGRR';

const defaultOptions = Object.freeze({});

const getInputProps = (state, meta) => {
  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor: model } = state;
  const { activation } = model.get(typeDef);
  if (typeCheck("String", activation)) {
    const inputShape = shape.slice(1);
    return { activation, inputShape };
  }
  throw new Error(`Expected string activation, but encountered ${activation}.`);
};

// TODO: Should warn if the user specified units on the target, as these will be overwritten.
const getTargetProps = (state, meta) => {
  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor: model } = state;
  const { targetActivation: activation } = model.get(typeDef);
  const units = shape[shape.length - 1];
  if (typeCheck("String", activation)) {
    return { units, activation };
  }
  return { units };
};

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
