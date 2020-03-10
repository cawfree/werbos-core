export const id = 'BkXJLyvysw3pqGVFokHpP';

const defaultOptions = Object.freeze({});

export default (options = defaultOptions) => {
  const opts = ({ ...defaultOptions, ...options });
  if (opts.hasOwnProperty("id")) {
    console.warn(`⚠️ Attempted to allocate a next() action with a defined id attribute, but this is reserved. This property will be overwritten.`);
  }
  const { limit } = opts;
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error(`Expected positive integer limit, encountered ${limit}.`);
  }
  return Object.freeze({
    ...opts,
    id,
  });
};
