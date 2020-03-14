import { tensor1d, stack, scalar } from "@tensorflow/tfjs";

import { id as transformMeta } from "../../meta/defs/transform";

export default () => (inputs, { useMeta, useTensor }) => {
  const { [transformMeta]: { width, height, channels } } = useMeta();

  // XXX: Allow all data to propagate normally.
  useTensor({ channels });

  return stack(
    inputs
      .map(
        input => tensor1d(input)
          // XXX: This is *not* element-wise normalization.
          //      Here, we're just exploting the known minima
          //      and maxima of the input data across all
          //      channels.
          .div(255)
          .reshape([height, width, channels]),
      ),
  );
};
