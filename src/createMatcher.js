import { typeCheck } from "type-check";

export default (...args) => typeCheck(
  ...args,
  {
    customTypes: {
      Buffer: { typeOf: 'Uint8Array', validate: Buffer.isBuffer },
    },
  },
);
