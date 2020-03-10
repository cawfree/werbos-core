import { Map } from "immutable";

import { id as Base } from "./defs/base";
import { id as Stream } from "./defs/stream";

export const baseContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Base);
};

export const Context = Object.freeze({
  Base,
  Stream,
});

export default Map();
