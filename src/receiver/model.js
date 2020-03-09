import { Map } from "immutable";
import { typeCheck } from "type-check";

// TODO: Just propagate the hooks.
// TODO: Should we pass the full state configuration? This assumes the global state will *not* change during calling receivers.
export const shouldReceive = (state, computeKeyFor, ...stages) => {
  const { receiver: model } = state;
  // XXX: Order is inconsequential; the receiver will be recursively called
  //      until a prevailing layout has been retained.
  return Object.entries(model.toJS())
    .reduce(
      (stages, [id, [shouldReceiveStages]]) => shouldReceiveStages(
        state,
        computeKeyFor,
        ...stages,
      ),
      stages,
    );
};

export default Map();
