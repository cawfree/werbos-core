import { tensor1d, sub, scalar, sign, relu } from "@tensorflow/tfjs";
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

  // XXX: I believe this is compatible with tf.
  //const nextShape = [width, height, channels];

  // XXX: Thresholded data only returns a single channel of data.
  useTensor({ channels: 1 });

  return inputs
    .map(buf => sumBuffer(buf, channels))
    .map(input => tensor1d(input)
      .sub(scalar(otsu(input)))
      .sign()
      .relu()
      // Verify that this works.
      .reshape([height, width, 1]),
    );
    //.map(e => console.log(e.length,'vs',width*height));

  // 2352 / (28*28)
  // converted an array of numbers into a buffer
  // where [Number] was a full image 2d,
  // "typeDef": "[[Number]]",
  // Need to use this information to correctly interpret image data.
  // How does sharp do it? Is it hardware agnostic? i.e. endianness?
  //throw 'we got here!';
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
