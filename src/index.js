import axios from "axios";
import compose from 'rippleware';

export { normalize, scalar } from "./tensor";
export { sequential, dense } from "./network";

export const https = () => handle =>
  handle("String", (url, last) =>
    axios({
      method: "get",
      url
    }).then(({ data }) => data)
  );

export default compose;
