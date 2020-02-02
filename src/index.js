import axios from "axios";
import compose from "rippleware";

export { Types, normalize, scalar } from "./tensor";
export { dense } from './network';
export { Tensor, Sequential } from './shape';

export const https = () => handle =>
  handle("String", (url, last) =>
    axios({
      method: "get",
      url
    }).then(({ data }) => data)
  );

export default compose;
