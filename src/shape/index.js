export const Tensor =
  "{kept:Boolean,isDisposedInternal:Boolean,shape:Array,dtype:String,size:Number,strides:[Number],dataId:Object,id:Number,rankType:String,...}";
export const TensorTypeDef = `{type:String,$tensor:${Tensor}}`;
export const Sequential = `(${TensorTypeDef},${TensorTypeDef})`;
