import { typeCheck } from "type-check";
import { Map } from "immutable";
import { pre } from "rippleware";

import { model as modelShape } from "../shape";

import { id as denseId } from "./defs/dense";
import { id as dropoutId } from "./defs/dropout";

// TODO: Should define a prevent useMeta write for layers.
//       This is the only place where modifiable layer
//       operations may be permitted.

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
        (model, { ...hooks }) => Promise
          .resolve()
          .then(() => layerMiddleware(withOptions)(model, { ...hooks }))
          .then(
            (layerParams) => {
              if (!typeCheck("{...}", layerParams)) {
                throw new Error(`Expected [object Object] layerParams, encountered ${layerParams}.`);
              }
              model.add(createLayer(layerParams));
              return model;
            },
          ),
      ],
    ];
  },
);

export const dense = options => useLayer(denseId, options);
export const dropout = options => useLayer(dropoutId, options);

export default Map();
