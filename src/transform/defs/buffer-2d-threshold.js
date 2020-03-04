import { tensor1d, sub, scalar, sign, relu } from "@tensorflow/tfjs";
import otsu from "otsu";

import { id as transformMeta } from "../../meta/defs/transform";

import { reshape2d } from "../model";

export default () => (inputs, { useMeta }) => {
  const { [transformMeta]: { width, height, channels } } = useMeta();
  // Need to use this information to correctly interpret image data.
  // How does sharp do it? Is it hardware agnostic? i.e. endianness?
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
