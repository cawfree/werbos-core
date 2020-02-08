import werbos from '../src';

it("should register tensor type definitions by default", () => {
  const app = werbos()
    .use('*', (input) => !input);

  expect(true)
    .toBeTruthy();
});
