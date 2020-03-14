import { typeCheck } from "type-check";
import { loadGraphModel } from "@tensorflow/tfjs";
import isUrl from "is-url";
import parseUrl from "parse-url";
import compose, { pre } from "rippleware";

import { contextAware, Context } from "../../context";

const { Base, Network } = Context;

const loadGraphModelFromUrl = (url) => {
  const { resource } = parseUrl(url);
  return loadGraphModel(
    url,
    {
      fromTFHub: resource === 'tfhub.dev',
    },
  );
};

const parseConstructor = (...args) => {
  if (args.length !== 1) {
    throw new Error(`Expected String, encountered ${args}.`);
  }
  const [maybePathOrUrl] = args;
  if (!typeCheck("String", maybePathOrUrl)) {
    throw new Error(`Expected String, encountered ${maybePathOrUrl}.`);
  } else if (!isUrl(maybePathOrUrl)) {
    throw new Error(`Expected url, encountered ${maybePathOrUrl}.`);
  }
  return maybePathOrUrl;
};

// TODO: pretrained can be either a layer or a network, need to represent this
export default (...args) => contextAware(
  {
    [Base]: () => (_, { useState }) => {
      const [cached, setCached] = useState(null);
      return Promise.resolve(parseConstructor(...args))
        .then(
          (path) => {
            if (!cached) {
              const path = parseConstructor(...args);
              if (isUrl(path)) {
                return loadGraphModelFromUrl(path)
                  .then(model => setCached(model) || model);
              }
            }
            return cached;
          },
        );
    },
    //[Network]: () => {
    //  // load layers model
    //},
  },
);
