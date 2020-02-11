import { Map } from "immutable";

const defaultTensor = Object.freeze({});

export const createTensor = (props = defaultTensor) =>
  Object.freeze({ ...defaultTensor, ...props });

export default Map({});
