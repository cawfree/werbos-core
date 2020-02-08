export const Tensor =
  "{kept:Boolean,isDisposedInternal:Boolean,shape:Array,dtype:String,size:Number,strides:[Number],dataId:Object,id:Number,rankType:String,...}";
export const TensorTypeDef = `{type:String,$tensor:${Tensor},...}`;
export const Sequential = `(${TensorTypeDef},${TensorTypeDef})`;

// TODO: This is a super-naive implementation.
export const Model =
  "{id:Number,_trainableWeights:Array,_nonTrainableWeights:Array,_losses:Array,_updates:Array,_built:Boolean,inboundNodes:Array,outboundNodes:Array,name:String,inputs:Array,outputs:Array,layers:Array,inputLayers:Array,outputLayers:Array,inputNames:Array,outputNames:Array,isTraining:Boolean,feedInputShapes:Array,feedInputNames:Array,feedOutputNames:Array,internalOutputShapes:Array,internalInputShapes:Array,...}";
export const ModelTypeDef = `{type:String,$model:${Model},...}`;
