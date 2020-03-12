import axios from "axios";
import fs from "fs";
import { typeCheck } from "type-check";
import compose, { pre } from "rippleware";

import createReceiver from "./createReceiver";
import createStore from "./createStore";
import createVariant from "./createVariant";

import { initialMeta } from "./meta";
import { baseContext, contextAware, Context } from "./context";

const { Base, Stream } = Context;

export { Context } from "./context";
export { dense, dropout, conv, pooling, flatten } from "./layer";
export { Meta } from "./meta";
export { Shape } from "./shape";
export { sequential } from "./network";
export { stream, next } from "./stream";
export { train, kfold } from "./train";
export { oneHot, normalize, scalar, threshold } from "./transform";
export { shuffle } from "./tensor";
export { Variant } from "./variant";

export const routeByShape = getShapeImpl => (input, { useGlobal }) => {
  const { getState } = useGlobal();
  return typeCheck(getShapeImpl(getState()), input);
};

const jsonByUrl = url => axios({ method: "get", url })
  .then(({ data }) => data);

const jsonByPath = path => fs.promises.readFile(path)
  .then(data => JSON.parse(data));

export const https = () => [
  ['String', jsonByUrl],
  ['[String]', urls => Promise.all(urls.map(url => jsonByUrl(url)))],
];

export const files = (...args) => contextAware(
  {
    [Base]: () => [
      ['String', jsonByPath],
      ['[String]', paths => Promise.all(paths.map(path => jsonByPath(path)))],
    ],
    [Stream]: () => {
      if (args.length !== 1) {
        throw new Error(`A call to files() within a stream must be initialized using a single parent directory to sample file data from.`);
      }
      const [dir] = args;
      if (!fs.existsSync(dir)) {
        throw new Error(`The resource ${dir} does not exist.`);
      } else if (!fs.lstatSync(dir).isDirectory()) {
        throw new Error(`The specified resource is not a valid directory.`);
      }
      return (action, { ...extraHooks }) => {
        return Math.random();
      };
    },
  },
);

export default () => compose(createStore, createReceiver, createVariant)
  .ctx(baseContext())
  .use(pre(initialMeta()));
