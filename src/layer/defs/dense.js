import { typeCheck } from "type-check";
import { layers } from '@tensorflow/tfjs';

import { model } from '../../shape';

const { dense } = layers;
const defaultOptions = Object.freeze({});

const getInputProps = (state, [tensor, tensorMeta]) => {
  const { tensor: typeDef } = tensorMeta;
  if (!typeCheck('String', typeDef)) {
    throw new Error(`Expected tensor type definition, but encountered ${typeDef}.`);
  }
  const { tensor: model } = state;
  const { activation } = model.get(typeDef);
  if (typeCheck('String', activation)) {
    const { shape } = tensor;
    return { activation, inputShape: shape.slice(1) };
  }
  throw new Error(`Expected string activation, but encountered ${activation}.`);
};

// TODO: Should warn if the user specified units on the target, as these will be overwritten.
const getTargetProps = (state, [tensor, targetMeta]) => {
  const { tensor: typeDef } = targetMeta;
  if (!typeCheck('String', typeDef)) {
    throw new Error(`Expected tensor type definition, but encountered ${typeDef}.`);
  }
  const { shape } = tensor;
  const { tensor: model } = state;
  const { targetActivation: activation } = model.get(typeDef);
  const units = shape[shape.length - 1];
  if (typeCheck('String', activation)) {
    return { units, activation };
  }
  return { units };
};

export default (options = defaultOptions) => (handle, { getState }) => handle(model(getState()), (model, { useGlobal, useMeta, useTopology }) => {
  const [index, length] = useTopology();
  // XXX: The sequential() item will be the first entry in the middleware.
  const firstLayer = index === 1;
  const targetLayer = index === length - 1;
  const [inputDef, targetDef] = useMeta();
  const { getState } = useGlobal();
  const state = getState();

  model.add(
    dense(
      {
        ...options,
        ...(firstLayer ? getInputProps(state, inputDef) : {}),
        ...(targetLayer ? getTargetProps(state, targetDef) : {}),
      },
    )
  );

  useMeta(useMeta());

  return model;
});
