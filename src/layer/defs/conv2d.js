//import { typeCheck } from "type-check";

//import { getLastActivation } from "../model";
//
//import { id as stimuliMeta } from "../../meta/defs/stimuli";

import { id as tensorMeta } from "../../meta/defs/tensor";
import { getInputProps } from "../model";

export const id = 'lLUO5EV7WZNiS1BLeNpYB';

const defaultOptions = Object.freeze({
  //inputShape: [28, 28, 1],
  //kernelSize: 5,
  //filters: 8,
  //strides: 1,
  //activation: 'relu',
  //kernelInitializer: 'varianceScaling'
});

export default (options = defaultOptions) => (model, { useGlobal, useTopology, useMeta }) => {
  const { getState } = useGlobal();
  const state = getState();
  const [index, length] = useTopology();
  const [inputDef, targetDef] = useMeta();
  const { [tensorMeta]: { channels } } = inputDef;

  // XXX: Although unused, we can ensure that the appropriate initialization
  //      methodology has been followed.
  if (isNaN(channels) || !Number.isInteger(channels) || channels < 1) {
    throw new Error(`Expected integer tensor meta channels, encountered ${channels}.`);
  }

  const firstLayer = index === 1;

  const x = {
    ...{
      ...defaultOptions,
      ...options,
    },
    ...(firstLayer ? getInputProps(state, inputDef) : {}),
  };
  console.log(x);
  throw 'yeah you allocated me';
};

//const getInputProps = (state, meta) => {
//  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
//  if (!typeCheck("String", typeDef)) {
//    throw new Error(
//      `Expected tensor type definition, but encountered ${typeDef}.`
//    );
//  }
//  const { tensor: model } = state;
//  const { activation } = model.get(typeDef);
//  if (typeCheck("String", activation)) {
//    const inputShape = shape.slice(1);
//    return { activation, inputShape };
//  }
//  throw new Error(`Expected string activation, but encountered ${activation}.`);
//};
//
//// TODO: Should warn if the user specified units on the target, as these will be overwritten.
//const getTargetProps = (state, meta) => {
//  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
//  if (!typeCheck("String", typeDef)) {
//    throw new Error(
//      `Expected tensor type definition, but encountered ${typeDef}.`
//    );
//  }
//  const { tensor: model } = state;
//  const { targetActivation: activation } = model.get(typeDef);
//  const units = shape[shape.length - 1];
//  if (typeCheck("String", activation)) {
//    return { units, activation };
//  }
//  return { units };
//};
//
//const getHiddenProps = (state, inputDef, targetDef) => ({
//  // XXX: Assume the activation of the previous layer.
//  activation: getLastActivation(inputDef),
//});
//
//export default (options = defaultOptions) => (model, { useGlobal, useMeta, useTopology }) => {
//  const [index, length] = useTopology();
//  const firstLayer = index === 1;
//  const targetLayer = index === length - 1;
//  const meta = useMeta();
//  const [inputDef, targetDef] = meta;
//  const { getState } = useGlobal();
//  const state = getState();
//
//  const lastActivation = ((!firstLayer) && getLastActivation(inputDef)) || undefined;
//
//  return {
//    // XXX: Allow hidden layers to have their dynamic props overrided,
//    //      since these are genuine guesses.
//    ...((!(firstLayer || targetLayer)) ? getHiddenProps(state, inputDef, targetDef) : {}),
//    ...{
//      ...defaultOptions,
//      ...options,
//    },
//    ...(firstLayer ? getInputProps(state, inputDef) : {}),
//    ...(targetLayer ? getTargetProps(state, targetDef) : {}),
//  };
//  q
//};
