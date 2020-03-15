import { Map } from "immutable";

import { id as Event } from "./defs/event";
import { id as Layer } from "./defs/layer";
import { id as Stimuli } from "./defs/stimuli";
import { id as Tensor } from "./defs/tensor";
import { id as Transform } from "./defs/transform";

export const Meta = Object.freeze({ Event, Layer, Stimuli, Tensor, Transform });

export const initialMeta = () => ({ useGlobal }) => {
  const { getState } = useGlobal();
  const { meta: model } = getState();
  const meta = model.toJS();
  return (input, { useMeta }) => {
    useMeta(meta);
    return input;
  };
};

export default Map();
