import { typeCheck } from "type-check";

export default (...args) => typeCheck(
  ...args,
  { customTypes: {} },
);
