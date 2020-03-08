import { typeCheck } from "type-check";
import { model } from "./shape";

export default ({ useGlobal }, params) => {
  const { getState } = useGlobal();
  params
    .map(
      ([_, args]) => {
        if (typeCheck(`(((String,Function)))`, args)) {
          const [[[typeDef, maybeLayer]]] = args;
          console.log(maybeLayer);
        }
      },
    );
  return params;
};
