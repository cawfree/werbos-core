import { Map } from "immutable";

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
