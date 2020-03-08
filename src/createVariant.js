import nanoid from "nanoid";

import { createVariant } from "./variant";

export default ({ useGlobal }, ...args) => {
  const { getState } = useGlobal();
  return createVariant(getState(), ...args);
};
