import { Map } from "immutable";
import { tidy, multinomial, div, log, squeeze } from "@tensorflow/tfjs";

export const oneHotRectify = (tensor, sym, t = 1e-6) => {
  const results = tidy(() =>
    multinomial(div(log(squeeze(tensor)), t), 1, null, false).dataSync()
  );
  // XXX: There is some native weirdness preventing us from using .map()
  //      for symbol evaluation. (It causes string-2d-onehot to fail.)
  const symbols = [];
  for (let i = 0; i < results.length; i += 1) {
    symbols.push(sym[results[i]]);
  }
  return symbols;
};

export default Map();
