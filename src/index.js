import axios from "axios";
import fs from "fs";
import compose, { pre } from "rippleware";

import createReceiver from "./createReceiver";
import createStore from "./createStore";
import createVariant from "./createVariant";

import { initialMeta } from "./meta";
import { baseContext } from "./context";

export { Context } from "./context";
export { dense, dropout, conv, pooling, flatten } from "./layer";
export { Meta } from "./meta";
export { sequential } from "./network";
export { stream } from "./stream";
export { train, kfold } from "./train";
export { oneHot, normalize, scalar, threshold } from "./transform";
export { shuffle } from "./tensor";
export { Variant } from "./variant";

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

export default () => compose(createStore, createReceiver, createVariant)
  .ctx(baseContext())
  .all(pre(initialMeta()));
