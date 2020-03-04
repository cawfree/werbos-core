import { tensor1d, stack } from "@tensorflow/tfjs";

export default () => inputs =>
  stack(inputs.map(input => tensor1d(new Float32Array(input))))
  .transpose();
