import { Map } from "immutable";
import { tidy, multinomial, div, log, squeeze } from "@tensorflow/tfjs";

export const oneHotRectify = (tensor, sym, t = 1e-6) => tidy(() =>
  multinomial(div(log(squeeze(tensor)), t), 1, null, false).dataSync()
).map(e => sym[e]);

export default Map();
