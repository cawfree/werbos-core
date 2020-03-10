import { typeCheck } from "type-check";
import compose, { noop } from "rippleware";

import { Context } from "../../context";

const { Stream } = Context;

const applyStreamContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Stream);
};

export default () => compose()
  .ctx(applyStreamContext());
