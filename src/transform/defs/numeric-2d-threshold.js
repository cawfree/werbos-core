import { tensor1d, scalar, stack } from "@tensorflow/tfjs";
import otsu from "otsu";

export default () => inputs => stack(
  inputs.map(input =>
    tensor1d(input)
      .sub(scalar(otsu(input)))
      .sign()
      .relu()
  ),
);
