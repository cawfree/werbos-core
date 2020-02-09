import { tensor1d } from "@tensorflow/tfjs";

import { stats, scaleFeatures, reshape2d } from "../model";

export default () => (inputs, { useState }) => {
  const [normals] = useState(() => inputs.map(t => stats(t)));
  const data = inputs.map((input, i) => {
    const [mean, std] = normals[i];
    return scaleFeatures(input, mean, std);
  });
  // TODO: We can likely abstract this by config.
  return reshape2d(data);
};
