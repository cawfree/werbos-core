import { tensor1d, sub, scalar, sign, relu } from "@tensorflow/tfjs";
import otsu from "otsu";

import { reshape2d } from "../model";

export default () => inputs => {
  throw 'we got here!';
  // TODO: This might be wrong! It's a different implementation from /master.
  //       If low prediction rates occur, the older model should be reused.
  //return reshape2d(
  //  inputs.map(input =>
  //    tensor1d(input)
  //      .sub(scalar(otsu(input)))
  //      .sign()
  //      .relu()
  //  )
  //).transpose();
};