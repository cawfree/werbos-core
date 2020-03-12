import axios from "axios";
import fs from "fs";
import { sep } from "path";
import { typeCheck } from "type-check";
import compose, { pre } from "rippleware";

import createReceiver from "./createReceiver";
import createStore from "./createStore";
import createVariant from "./createVariant";

import { baseContext, contextAware, Context } from "./context";
import { initialMeta } from "./meta";
import { Shape } from "./shape";

const { Base, Stream } = Context;

export { Context, contextAware } from "./context";
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
    [Stream]: ({ useState }) => {
      if (args.length !== 1) {
        throw new Error(`A call to files() within a stream must be initialized using a single parent directory to sample file data from.`);
      }
      const [dir] = args;
      if (!fs.existsSync(dir)) {
        throw new Error(`The resource ${dir} does not exist.`);
      } else if (!fs.lstatSync(dir).isDirectory()) {
        throw new Error(`The specified resource is not a valid directory.`);
      }
      return ([id, action], { useState, ...extraHooks }) => {
        const [allFiles] = useState(() => [...fs.readdirSync(dir)]);
        const [count, setCount] = useState(() => 0);
        const { limit } = action;
        const nextBatch = allFiles.slice(count, count + limit);

        // TODO: What happens when limit is exceeded?
        setCount(count + limit);

        return Promise
          .all(
            nextBatch.map(
              path => jsonByPath(`${dir}${sep}${path}`),
            ),
          );
      };
    },
  },
);

export default () => compose(createStore, createReceiver, createVariant)
  .ctx(baseContext())
  .use(pre(initialMeta()));
