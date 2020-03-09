import { typeCheck } from "type-check";
import { model } from "./shape";

export default ({ useGlobal, useKey }, params) => {
  const { getState } = useGlobal();
   params.map(
     e => {
       console.log(useKey(e[0]));
     },
   );
  return params;
};
