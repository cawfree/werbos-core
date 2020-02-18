//import { typeCheck } from "type-check";
import { train } from "@tensorflow/tfjs";
import { slice, split, concat } from "@tensorflow/tfjs";
import { model as clone } from "tfjs-clone";

//import { loss, rectify } from "../model";
import { loss } from "../model";
import { model } from "../../shape";

// TODO: use random, etc
const defaultOptions = Object.freeze({
  k: 3,
  optimizer: train.rmsprop(1e-2),
  batchSize: 64,
  epochs: 10,
});

//const sliceTensors = (xs, len, k) => [...Array(k)]

export default (options = defaultOptions) => (handle, { getState }) =>
  handle(model(getState()), (model, { useMeta, useState, useGlobal }) => {
    const {
      k,
      optimizer,
      batchSize,
      epochs,
    } = options;
    // TODO: throw on bad k
    const { getState } = useGlobal();
    const [[xs], [ys, targetMeta]] = useMeta();
    const [cached, setCached] = useState(null);
    const { shape: [numberOfSamples] } = xs;
    
    // TODO: need to cut off the input tensor by the buffer length
    const bufferLength = numberOfSamples - (numberOfSamples % k);
    const samplesPerModel =  bufferLength / k;

    const xss = slice(xs, 0, bufferLength);
    const yss = slice(ys, 0, bufferLength);

    const xsss = split(xss, k);
    const ysss = split(yss, k);

    const state = getState();

    return Promise
      .all(
        [...Array(k)]
          .map(() => clone(model)),
      )
      .then(
        (models) => {
          models.forEach(
            model => model.compile({
              optimizer,
              loss: loss(state, targetMeta),
            }),
          );
          setCached(models);
          return Promise
            .all(
              models.map(
                (model, i) => {
                  const [xv, yv] = [
                    xsss[i],
                    ysss[i],
                  ];
                  const xs = concat(xsss.filter((_, j) => (j !== i)));
                  const ys = concat(ysss.filter((_, j) => (j !== i)));
                  return model.fit(
                    xs,
                    ys,
                    {
                      batchSize,
                      epochs,
                      validationData: [xv, yv],
                    },
                  );
                },
              ),
            );
          //return models
          //  .map(
          //    (model, i) => model

          //      //const validation_x = xsss[i];
          //      //const validation_y = xsss[i];
          //      //const training_x = xsss.filter((_, j) => (j !== i));
          //      //const training_y = ysss.filter((_, j) => (j !== i));
          //    },
          //  );
          //console.log('got models');
          //console.log(models);
          //console.log(models.length);
        },
      );
    //const [models, setModels] = useState([...Array(k)].map(async () => await clone(model)));

    //console.log(xs);
    //console.log(xss);

    //console.log(ys);
    //console.log(yss);

    //console.log(xsss);
    //console.log(ysss);

    //const xss = split(xs, k);
    //console.log(xs);
    //console.log('vs');
    //console.log(xss);
    // split your input data into k partitions
    


    //const { getState } = useGlobal();
    //// TODO: We need a proper architecture for this after the build level.
    ////       At the moment, we just keep re-recreating networks uselessly.
    //const [cached, setCached] = useState(null);
    //const [[xs], [ys, targetMeta]] = useMeta();
    //const state = getState();
    //if (!cached) {
    //  const { batchSize, epochs, optimizer, validationSplit } = {
    //    ...defaultOptions,
    //    ...options
    //  };
    //  model.compile({ optimizer, loss: loss(state, targetMeta) });
    //  setCached(model);
    //  return model.fit(xs, ys, { batchSize, epochs, validationSplit });
    //}
    //return rectify(state, cached.predict(xs), targetMeta);
  });
