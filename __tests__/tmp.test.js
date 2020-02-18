import "@babel/polyfill";

import werbos from "../src";

jest.setTimeout(24 * 60 * 60 * 1000);

it("blah", async () => {
  const app = werbos()
    .use('*', () => 2);

  const x = await app();

  console.log(x);

  expect(true).toBeTruthy();

});
