import { layers } from "@tensorflow/tfjs";
import { typeCheck } from "type-check";
import { pre } from "rippleware";

import { model } from "../../shape";

const { dense } = layers;
const defaultOptions = Object.freeze({});

const getInputProps = (state, [tensor, tensorMeta]) => {
  const { tensor: typeDef } = tensorMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor: model } = state;
  const { activation } = model.get(typeDef);
  if (typeCheck("String", activation)) {
    const { shape } = tensor;
    const inputShape = shape.slice(1);
    return { activation, inputShape };
  }
  throw new Error(`Expected string activation, but encountered ${activation}.`);
};

// TODO: Should warn if the user specified units on the target, as these will be overwritten.
const getTargetProps = (state, [tensor, targetMeta]) => {
  const { tensor: typeDef } = targetMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { shape } = tensor;
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
