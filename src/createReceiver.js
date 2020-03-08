import { typeCheck } from "type-check";
import { model } from "./shape";

export default ({ useGlobal }, params) => {
  const { getState } = useGlobal();
  console.log(params);
  return params;
};
