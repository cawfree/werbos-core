import { typeCheck } from "type-check";
import { Map } from "immutable";

export const loss = (state, targetMeta) => {
  const { id: typeDef } = targetMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor } = state;
  const { loss } = tensor.get(typeDef);
  if (!typeCheck("String", loss)) {
    throw new Error(
      `A loss function has not been specified for tensor "${typeDef}". Expected string, encountered ${loss}.`
    );
  }
  return loss;
};

export const rectify = (state, ys, targetMeta) => {
  const { rectify } = state;
  const { id: typeDef } = targetMeta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const shouldRectify = rectify.get(typeDef);
  if (!typeCheck("Function", shouldRectify)) {
    throw new Error(
      `Expected function rectifier, but encountered ${shouldRectify}.`
    );
  }
  return shouldRectify(ys, targetMeta);
};

export default Map();
