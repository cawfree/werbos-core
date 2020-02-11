import compose from "rippleware";

// TODO: Expects to be attached to two input tensors.

export default () =>
  compose().use("*", (input, { useMeta }) => {
    console.log(useMeta());
    useMeta(useMeta());
  });
