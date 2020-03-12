import { typeCheck } from "type-check";
import compose from "rippleware";

import { Context } from "../../context";

const { Stream } = Context;

const streamContext = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { context } = getState();
  return context.get(Stream);
};

const defaultOptions = Object.freeze({});

// TODO: Implement shared properties.
export default (options = defaultOptions) => compose()
  .ctx(streamContext({ ...defaultOptions, ...options }));
