import { sequential } from "@tensorflow/tfjs";
import compose from "rippleware";

import { stimuli } from '../../shape';

export default () => compose()
  .use((handle, { getState }) => handle(stimuli(getState()), (input, { useGlobal, useMeta }) => useMeta(useMeta()) || sequential()));
