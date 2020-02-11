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

const getTargetProps = (state, [tensor, targetMeta]) => {
  return {};
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
