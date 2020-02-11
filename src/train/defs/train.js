import { model } from "../../shape";

const defaultOptions = Object.freeze(
  {
    
  },
);

export default (options = defaultOptions) => (handle, { getState }) => handle(model(getState()), (input, { useMeta }) => {
  console.log(useMeta());
  //console.log('would train here');
});
