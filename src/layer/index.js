export { build, dense, dropout, conv, pooling, flatten } from "./actions";
export { default as reducer } from "./reducer";

// TODO: Is this pattern appropriate?
export const variant = (state, [[[model, LayerDefinition]]]) => LayerDefinition.layerPropTypes;
