import { layers } from "@tensorflow/tfjs";
import { typeCheck } from "type-check";
import { pre } from "rippleware";

import { model } from "../../shape";

import { id as tensorMeta } from "../../meta/defs/tensor";
import { id as stimuliMeta } from "../../meta/defs/stimuli";

const { dense } = layers;
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

const createDense = options => (model, { useGlobal, useMeta, useTopology }) => {
  const [index, length] = useTopology();
  const firstLayer = index === 1;
  const targetLayer = index === length - 1;
  const [inputDef, targetDef] = useMeta();
  const { getState } = useGlobal();
  const state = getState();

  model.add(
    dense({
      ...options,
      ...(firstLayer ? getInputProps(state, inputDef) : {}),
      ...((!(firstLayer || targetLayer)) ? {} : {}),
      ...(targetLayer ? getTargetProps(state, targetDef) : {}),
    })
  );

  return model;
};

export default (options = defaultOptions) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    const state = getState();
    return [
      [model(getState()), createDense(options)],
    ];
  },
);
