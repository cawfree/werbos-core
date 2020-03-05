import { typeCheck } from "type-check";
import { Map } from "immutable";
import { pre } from "rippleware";

import { id as layerMeta } from "../meta/defs/layer";
import { id as tensorMeta } from "../meta/defs/tensor";
import { id as stimuliMeta } from "../meta/defs/stimuli";

import { model as modelShape } from "../shape";
import { readOnly } from "../meta";


// TODO: Should define a prevent useMeta write for layers.
//       This is the only place where modifiable layer
//       operations may be permitted.

const concurrentMetaShape = "({...},{...})";
// TODO: Looks like we could use a shape for concurrent meta
const appendMeta = (useMeta, typeDef, layerParams) => {
  const metas = useMeta();
  if (!typeCheck(concurrentMetaShape, metas)) {
    throw new Error(`Expected concurrent state meta, encountered ${meta}.`);
  }
  return useMeta(
    metas
      .map(
        ({ [layerMeta]: lastLayers,...extraMeta }) => ({
          ...extraMeta,
          [layerMeta]: [
            ...lastLayers,
            [typeDef, layerParams],
          ],
        }),
      ),
  );
};

export const getInputProps = (state, meta) => {
  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor: model } = state;
  const { activation } = model.get(typeDef);
  if (typeCheck("String", activation)) {
    const inputShape = shape.slice(1);
    return { activation, inputShape };
  }
  throw new Error(`Expected string activation, but encountered ${activation}.`);
};

export const getTargetProps = (state, meta) => {
  const { [tensorMeta]: { id: typeDef }, [stimuliMeta]: { shape } } = meta;
  if (!typeCheck("String", typeDef)) {
    throw new Error(
      `Expected tensor type definition, but encountered ${typeDef}.`
    );
  }
  const { tensor: model } = state;
  const { targetActivation: activation } = model.get(typeDef);
  const units = shape[shape.length - 1];
  if (typeCheck("String", activation)) {
    return { units, activation };
  }
  return { units };
};

export const useLayer = (id, withOptions) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    const state = getState();
    const { layer: model } = state;
    const layer = model.get(id);
    if (!typeCheck("(Function,Function)", layer)) {
      throw new Error(`Attempted to use layer ${id}, but it does not exist. Has it been registered?`);
    }
    const [layerMiddleware, createLayer] = layer;
    return [
      [
        modelShape(state), 
        (model, { useMeta, ...extraHooks }) => Promise
          .resolve()
          .then(() => layerMiddleware(withOptions)(model, { useMeta: readOnly(useMeta), ...extraHooks }))
          .then(
            (layerParams) => {
              if (!typeCheck("{...}", layerParams)) {
                throw new Error(`Expected [object Object] layerParams, encountered ${layerParams}.`);
              }
              model.add(createLayer(layerParams));
              return appendMeta(useMeta, id, layerParams) || model;
            },
          ),
      ],
    ];
  },
);

// TODO: Might need to handle the case where eventually we'll treat 
//       undefined activations as null.
const getLastProp = (meta, prop, untilHasDefinition = true) => {
  if (typeCheck(concurrentMetaShape, meta)) {
    throw new Error(`Expected [object Object], encountered ${meta}.`);
  } else if (!typeCheck("String", prop)) {
    throw new Error(`Expected String prop, encountered ${prop}.`);
  }
  const { [layerMeta]: lastLayers } = meta;
  const { length } = lastLayers;
  if (length > 0) {
    for (let i = length - 1; i >= 0; i -= 1) {
      const [_, { [prop]: value }] = lastLayers[i];
      if (value !== undefined || !untilHasDefinition) {
        return value;
      }
    }
    return undefined;
  }
  throw new Error(`Attempted to fetch the ${prop} prop of the previous layer, but there aren't any.`);
};

export const getLastActivation = meta => getLastProp(meta, 'activation');

export default Map();
