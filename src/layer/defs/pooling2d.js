import { getLastKernelSize } from "../model";

export const id = 'pqg4MHXUCnFnGN1zBOzN_';

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

const kernelProps = (inputDef, kernelSize) => ({
  kernelSize: Number.isInteger(kernelSize) ? kernelSize : getLastKernelSize(inputDef) - 1,
});

export default (options = defaultOptions) => (model, { useMeta }) => {
  const [inputDef] = useMeta();
  const { kernelSize, ...extras } = options;
  return {
    ...defaultOptions,
    ...extras,
    ...kernelProps(
      inputDef,
      kernelSize,
    ),
  };
};
