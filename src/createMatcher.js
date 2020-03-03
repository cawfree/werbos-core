import { typeCheck } from "type-check";

const Buffer = Object.freeze({
  typeOf: 'Uint8Array',
  validate: Buffer.isBuffer,
});

export default () => (...args) => typeCheck(
  ...args,
  {
    customTypes: { Buffer },
  },
);
