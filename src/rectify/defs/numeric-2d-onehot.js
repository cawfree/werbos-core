import { tidy, multinomial, div, log, squeeze } from "@tensorflow/tfjs";
import { typeCheck } from "type-check";

export default (tensor, meta) => {
  const { sym } = meta;
  if (!typeCheck("[Number]", sym)) {
    throw new Error(
      `A one-hot numeric tensor must provide an array of symbols, but these aweren't specified. Expected [Number], encountered ${sym}.`
    );
  }
  return tidy(() =>
    multinomial(div(log(squeeze(tensor)), 1e-6), 1, null, false).dataSync()
  ).map(e => sym[e]);
};
