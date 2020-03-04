import axios from "axios";
import fs from "fs";
import compose, { pre } from "rippleware";

import createStore from "./createStore";
import createMatcher from "./createMatcher";

import { initialMeta } from "./meta";

export { dense, dropout, conv2d, pooling, flatten } from "./layer";
export { Meta } from "./meta";
export { sequential } from "./network";
export { train, kfold } from "./train";
export { oneHot, normalize, scalar, threshold } from "./transform";
export { shuffle } from "./tensor";

const jsonByUrl = url => axios({ method: "get", url })
  .then(({ data }) => data);

const jsonByPath = path => fs.promises.readFile(path)
  .then(data => JSON.parse(data));

export const https = () => [
  ['String', jsonByUrl],
  ['[String]', urls => Promise.all(urls.map(url => jsonByUrl(url)))],
];

export const files = () => [
  ['String', jsonByPath],
  ['[String]', paths => Promise.all(paths.map(path => jsonByPath(path)))],
];

export default () => compose(createStore, createMatcher)
  .all(pre(initialMeta()));
