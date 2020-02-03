import { ModelTypeDef, TensorTypeDef } from '../shape';

export default () => burden => burden(
  `(${ModelTypeDef},${TensorTypeDef},${TensorTypeDef})`, () => console.log('ready to train!'),
);
