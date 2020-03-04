export const id = 'FzFfAk5qLEYWCwAv65j4H';

const defaultOptions = Object.freeze({
  // TODO: what defaults are safe to use?
});

export default (options = defaultOptions) => () => ({...defaultOptions, ...options });
