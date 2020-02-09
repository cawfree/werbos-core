import { tensor1d } from '@tensorflow/tfjs';

import { stats, scaleFeatures, reshape2d } from '../model';

export default () => (inputs, { useState }) => {
  const [normals] = useState(() => inputs.map(t => stats(t)));
  // 2 got [ [ 1.5, 0.5 ], [ 3.5, 0.5 ] ]
  console.log(
    inputs.length,
    'got',
    inputs.map(t => stats(t)),
    'but normals are',
    normals,
  );
  console.log(normals, inputs, normals.length, inputs.length);
  const data = inputs
    .map(
      (input, i) => {
        console.log(normals, normals[i]);
        const [mean, std] = normals[i];
        console.log(mean, std);
        return scaleFeatures(input, mean, std);
      },
    );
  // TODO: We can likely abstract this by config.
  return reshape2d(data);
};
