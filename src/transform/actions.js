import { pre } from "rippleware";
import { typeCheck } from "type-check";

import { id as tensorMeta } from "../meta/defs/tensor";

import { getTransform } from "./model";
import { RECEIVE_TRANSFORM } from "./actionTypes";

import n1dn from "../tensor/defs/numeric-1d-normal.json";
import n1ds from "../tensor/defs/numeric-1d-scalar.json";
import n2dn from "../tensor/defs/numeric-2d-normal.json";
import n2do from "../tensor/defs/numeric-2d-onehot.json";
import n2ds from "../tensor/defs/numeric-2d-scalar.json";
import n2dt from "../tensor/defs/numeric-2d-threshold.json";
import s2do from "../tensor/defs/string-2d-onehot.json";

const receiveTransform = (id, func) => (dispatch, getState) => {
  const { transform } = getState();
  if (transform.has(id)) {
    throw new Error(`Attempted to overwrite reserved transform, ${id}.`);
  } else if (!typeCheck("Function", func)) {
    throw new Error(`Expected function, encountered ${func}.`);
  }
  return dispatch({
    type: RECEIVE_TRANSFORM,
    id,
    transform: func
  });
};

const useTensorMeta = (id, useMeta) => (...args) => {
  const meta = useMeta();
  const { [tensorMeta]: tensorMetadata } = meta;
  if (args.length === 0) {
    return meta;
  } else if (args.length > 1) {
    throw new Error(`useMeta() expected a single argument, but was passed ${args.length} arguments.`);
  }
  const [arg] = args;
  if (!typeCheck("Object", arg)) {
    throw new Error(`Expected [object Object], encountered ${arg}.`);
  }
  return useMeta(
    {
      ...meta,
      [tensorMeta]: {
        ...tensorMetadata,
        ...arg,
        id,
      },
    }
  );
};

const useTransform = (opts, ids) => pre(
  ({ useGlobal }) => {
    const { getState } = useGlobal();
    const { tensor, transform } = getState();
    return ids.map(
      (id) => {
        const { typeDef } = tensor.get(id);
        return [
          typeDef,
          (input, { useMeta, ...extras }) => {
            const useTensor = useTensorMeta(id, useMeta);
            // XXX: Ensure that at the bare minimum, required tensor information is persisted.
            return useTensor({}) || transform.get(id)(opts)(input, { ...extras, useTensor });
          },
        ];
      },
    );
  },
);

export const oneHot = opts => useTransform(opts, [n2do.id, s2do.id]);
export const normalize = opts => useTransform(opts, [n1dn.id, n2dn.id]);
export const scalar = opts => useTransform(opts, [n1ds.id, n2ds.id]);
export const threshold = opts => useTransform(opts, [n2dt.id]);

export const build = () => (dispatch, getState) => {
  dispatch(
    receiveTransform(n1dn.id, require("./defs/numeric-1d-normal.js").default)
  );
  dispatch(
    receiveTransform(n1ds.id, require("./defs/numeric-1d-scalar.js").default)
  );
  dispatch(
    receiveTransform(n2dn.id, require("./defs/numeric-2d-normal.js").default)
  );
  dispatch(
    receiveTransform(n2do.id, require("./defs/numeric-2d-onehot.js").default)
  );
  dispatch(
    receiveTransform(n2ds.id, require("./defs/numeric-2d-scalar.js").default)
  );
  dispatch(
    receiveTransform(n2dt.id, require("./defs/numeric-2d-threshold.js").default)
  );
  dispatch(
    receiveTransform(s2do.id, require("./defs/string-2d-onehot.js").default)
  );
};
