import { typeCheck } from "type-check";

export const id = '1ucjPlpfZxsw_3zfuZDNS';

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

export default (options = defaultOptions) => () => ({...defaultOptions, ...options });
