import axios from "axios";
import fs from "fs";
import compose from 'rippleware';

export { normalize, scalar, oneHot, threshold } from "./tensor";
export { sequential, dense } from "./network";
export { default as train } from "./train";

export const https = () => handle =>
  handle("String", (url) =>
    axios({
      method: "get",
      url
    }).then(({ data }) => data)
  );

export const files = () => handle => [
  handle(
    "String", path => fs.promises.readFile(path)
      .then(data => JSON.parse(data)),
  ),
  handle(
    "[String]", paths => Promise
      .all(
        paths.map(
          path => fs.promises.readFile(path)
            .then(data => JSON.parse(data)),
        ),
      ),
  ),
] && undefined;

export default compose;
