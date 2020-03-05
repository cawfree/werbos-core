import { id as tensorMeta } from "../../meta/defs/tensor";
import { getInputProps, getLastActivation } from "../model";

export const id = 'lLUO5EV7WZNiS1BLeNpYB';

const defaultOptions = Object.freeze({
  //kernelSize: 5,
  //filters: 8,
  //strides: 1,
  //kernelInitializer: 'varianceScaling'
});

const getHiddenProps = (state, inputDef) => ({
  activation: getLastActivation(inputDef),
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
  const lastLayer = index === length - 1;

  return {
    ...((!firstLayer && !lastLayer) ? getHiddenProps(state, inputDef) : {}),
    ...{
      ...defaultOptions,
      ...options,
    },
    ...(firstLayer ? getInputProps(state, inputDef) : {}),
  };
};
