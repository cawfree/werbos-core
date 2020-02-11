import { tensor1d } from "@tensorflow/tfjs";

export default () => input => tensor1d(new Float32Array(input));
