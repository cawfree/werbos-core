import { tensor1d, stack } from "@tensorflow/tfjs";

import { stats, scaleFeatures } from "../model";

export default () => (inputs, { useState }) => {
  const [normals] = useState(() => inputs.map(t => stats(t)));
  const data = inputs.map((input, i) => {
    const [mean, std] = normals[i];
    return tensor1d(scaleFeatures(input, mean, std));
  });
  return stack(data)
    .transpose();
};
