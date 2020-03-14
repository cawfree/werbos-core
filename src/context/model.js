import { Map } from "immutable";
import { pre, noop } from "rippleware";

import { id as Base } from "./defs/base";
import { id as Network } from "./defs/network";
import { id as Stream } from "./defs/stream";

const defaultContextReceivers = Object.freeze({});

export const Context = Object.freeze({
  Base,
  Network,
  Stream,
});

export const baseContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Base);
};

const createUnsupportedContextThunk = ctx => () => {
  throw new Error(`Operation context ${ctx} is not supported by this handler.`);
};

export const contextAware = (contextReceivers = defaultContextReceivers) => pre(
  ({ ...extraHooks }) => {
    const { useContext } = extraHooks;
    const ctx = useContext();
    const fn = { ...defaultContextReceivers, ...contextReceivers }[ctx] || createUnsupportedContextThunk(ctx);
    return fn({ ...extraHooks });
  },
);

export default Map();
