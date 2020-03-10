import { Map } from "immutable";

import { id as Base } from "./defs/base";

export const baseContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Base);
};

export const Context = Object.freeze({ Base });

export default Map();
