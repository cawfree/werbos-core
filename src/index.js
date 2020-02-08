import axios from "axios";
import fs from "fs";
import compose, { justOnce } from "rippleware";

import createStore from './createStore';

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
