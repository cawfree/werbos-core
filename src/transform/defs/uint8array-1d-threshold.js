import { tensor1d, stack, scalar } from "@tensorflow/tfjs";
import otsu from "otsu";

import { id as transformMeta } from "../../meta/defs/transform";

import { reshape2d } from "../model";

const sumBuffer = (buf, channels) => {
  const vec = [];
  let i = 0;
  while (i < buf.length) {
    let v = 0;
    for (let j = 0; j < channels; j++) {
      v += buf[i++];
    }
    vec.push(v);
  }
  return vec;
};

export default () => (inputs, { useMeta, useTensor }) => {
  const { [transformMeta]: { width, height, channels } } = useMeta();

  // XXX: Thresholded data only returns a single channel of data.
  useTensor({ channels: 1 });

  // TODO: It's likely that we can use stack for the reshape2d implementation.
  return stack(
    inputs
      .map(buf => sumBuffer(buf, channels))
      .map(
        input => tensor1d(input)
          .sub(scalar(otsu(input)))
          .sign()
          .relu()
          .reshape([height, width, 1]),
      ),
  );
};
