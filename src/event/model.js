import { Map } from "immutable";

import { id as eventMeta } from "../meta/defs/event";

import { id as predictId } from "./defs/predict";
import { id as trainId } from "./defs/train";

export const assertEvents = () => (/* pre */) => (inputData, { useGlobal, useMeta }) => {
  if (Array.isArray(inputData)) {
    const { getState } = useGlobal();
    const { event: model } = getState();
    const [id, args] = inputData;
    if (model.has(id)) {
      // XXX: Configure the mode of operation for the network; "train"/"predict".
      useMeta({ ...useMeta(), [eventMeta]: { id } });
      return args;
    }
  }
  // TODO: Needs to be a function of config. i.e. "friendlyName" @ json.
  throw new Error("You may only pass a network either a train() or predict() event.");
};

// TODO: Needs to depend upon the state somehow.
const useEvent = (id, ...args) => [id, [...args]];

export const predict = (...args) => useEvent(predictId, ...args);
export const train = (...args) => useEvent(trainId, ...args);

const createAssertEventThunk = id => (...args) => {
  console.log(args);
//_, { useMeta }
  return true;
  //const { [eventMeta]: { id: currentEventId } } = useMeta();
  //// TODO: This isn't going to work.
  //return currentEventId === trainId;
}

// XXX:  Conditional execution hooks.
// TODO: We should probably use the context to determine whether meta is split or not.
export const Predicting = createAssertEventThunk(predictId);
export const Training = createAssertEventThunk(trainId);

export default Map();
