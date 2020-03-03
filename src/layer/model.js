import { typeCheck } from "type-check";
import { Map } from "immutable";
import { pre } from "rippleware";

import { model as modelShape } from "../shape";

import { id as denseId } from "./defs/dense";
import { id as dropoutId } from "./defs/dropout";

import { id as layerMeta } from "../meta/defs/layer";

// TODO: Should define a prevent useMeta write for layers.
//       This is the only place where modifiable layer
//       operations may be permitted.

const appendMeta = (useMeta, typeDef, layerParams) => {
  const metas = useMeta();
  if (!typeCheck("({...},{...})", metas)) {
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

const readOnly = useMeta => (...args) => {
  if (args.length > 0) {
    throw new Error(`A layer attempted to write using useMeta(), but this operation is not permitted.`);
  }
  return useMeta(...args);
};

const useLayer = (id, withOptions) => pre(
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

export const dense = options => useLayer(denseId, options);
export const dropout = options => useLayer(dropoutId, options);

export default Map();
