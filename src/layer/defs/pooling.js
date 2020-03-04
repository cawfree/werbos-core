export const id = 'pqg4MHXUCnFnGN1zBOzN_';

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

export default (options = defaultOptions) => () => ({...defaultOptions, ...options });
