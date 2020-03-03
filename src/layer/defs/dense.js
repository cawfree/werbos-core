import { typeCheck } from "type-check";

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

export default (options = defaultOptions) => (model, { useGlobal, useMeta, useTopology }) => {
  const [index, length] = useTopology();
  const firstLayer = index === 1;
  const targetLayer = index === length - 1;
  const [inputDef, targetDef] = useMeta();
  const { getState } = useGlobal();
  const state = getState();
  return {
    ...{
      ...defaultOptions,
      ...options,
    },
    ...(firstLayer ? getInputProps(state, inputDef) : {}),
    ...((!(firstLayer || targetLayer)) ? {} : {}),
    ...(targetLayer ? getTargetProps(state, targetDef) : {}),
  };
  q
};
