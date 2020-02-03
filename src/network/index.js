import { Sequential } from "../shape";

export const sequential = () => burden => burden(
  Sequential,
  (input) => console.log('got here'),
);
