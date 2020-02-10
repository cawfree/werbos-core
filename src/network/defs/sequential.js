import compose from 'rippleware';

export default () => {
  return compose()
    .use('*', () => false);
};
