import { Map } from "immutable";

import { id as Stimuli } from "./defs/stimuli";
import { id as Tensor } from "./defs/tensor";
import { id as Transform } from "./defs/transform";

export const initialMeta = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { meta: model } = getState();
  const meta = model.toJS();
  return (input, { useMeta }) => {
    useMeta(meta);
    return input;
  };
};

export const Meta = Object.freeze(
  {
    Stimuli,
    Tensor,
    Transform,
  },
);

export default Map();
