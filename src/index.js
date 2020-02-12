import axios from "axios";
import fs from "fs";
import compose from "rippleware";

import createStore from "./createStore";

export { dense } from "./layer";
export { sequential } from "./network";
export { train } from "./train";
export { oneHot, normalize, scalar, threshold } from "./transform";

export const https = () => handle =>
  handle("String", url =>
    axios({
      method: "get",
      url
    }).then(({ data }) => data)
  );

export const files = () => handle =>
  [
    handle("String", path =>
      fs.promises.readFile(path).then(data => JSON.parse(data))
    ),
    handle("[String]", paths =>
      Promise.all(
        paths.map(path =>
          fs.promises.readFile(path).then(data => JSON.parse(data))
        )
      )
    )
  ] && undefined;

export default (options = { sync: true }) => compose(createStore, options);
