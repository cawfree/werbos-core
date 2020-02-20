import { Map } from "immutable";
import { tensor1d, util } from "@tensorflow/tfjs";

const { createShuffledIndices } = util;

const defaultTensor = Object.freeze({});

// TODO: This dedicated middleware deserves its own file.
/**
 * Shuffles multiple tensors synchronously with one-another.
 *
 * @param {[tensor]} tensors The tensors to shuffle.
 * @return {[tensor]} The array of shuffled tensors.
 *
 * @example
 * shuffle(tf.tensor1d([0, 1, 2, 3]), tf.tensor1d([0, 1, 2, 3]))
 */
export const shuffle = () => handle => handle(
  // TODO: use tensor shape
  '[*]', ([...tensors], { useMeta }) => {
    const shapes = tensors
      .map(({ shape: [len] }) => len);
    if (Math.max(...shapes) === Math.min(...shapes)) {
      useMeta(useMeta());
      const [shape] = shapes;
      const idx = tensor1d(new Int32Array(createShuffledIndices(shape)));
      return tensors.map(t => t.gather(idx));
    }
    throw new Error("It is not possible to shuffle tenso");
  },
);

export const createTensor = (props = defaultTensor) =>
  Object.freeze({ ...defaultTensor, ...props });

export default Map({});
