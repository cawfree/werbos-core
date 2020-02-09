import { concat, tensor1d, scalar } from "@tensorflow/tfjs";
import otsu from "otsu";

import { reshape2d } from "../model";

export default () => inputs =>
  // TODO: This might be wrong! It's a different implementation from /master.
  //       If low prediction rates occur, the older model should be reused.
  reshape2d(
    inputs.map(input =>
      tensor1d(input)
        .sub(scalar(otsu(input)))
        .sign()
        .relu()
    )
  )
  .transpose();
