import { Map } from 'immutable';

const defaultTensor = Object
  .freeze(
    {
      
    },
  );

// TODO: Could add sanity checking for these props.
export const createTensor = (props = defaultTensor) => Object.freeze({ ...defaultTensor, ...props });

export default Map({});
