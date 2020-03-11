import { typeCheck } from "type-check";
import compose from "rippleware";

import { Context } from "../../context";

const { Stream } = Context;

const streamContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Stream);
};

export default () => compose()
  .ctx(streamContext());
