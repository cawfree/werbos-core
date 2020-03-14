import { typeCheck } from "type-check";
import { loadGraphModel } from "@tensorflow/tfjs";
import isUrl from "is-url";
import parseUrl from "parse-url";
import compose, { pre } from "rippleware";

import { contextAware, Context } from "../../context";

export const id = "H3M49kTaJTfMo0atewWmh";

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

const parseOptions = (maybePathOrUrl) => {
  if (!typeCheck("String", maybePathOrUrl)) {
    throw new Error(`Expected String, encountered ${maybePathOrUrl}.`);
  } else if (!isUrl(maybePathOrUrl)) {
    throw new Error(`Expected url, encountered ${maybePathOrUrl}.`);
  }
  return maybePathOrUrl;
};

// TODO: pretrained can be either a layer or a network, need to represent this
// XXX:  At this stage, we're basically forcing the context as a network. We need
//       a higher-level function capable of reflecting this.
export default options => (stimuli, { useState }) => {
  const [cached, setCached] = useState(null);
  return Promise.resolve(parseOptions(options))
    .then(
      (path) => {
        if (!cached) {
          if (isUrl(path)) {
            return loadGraphModelFromUrl(path)
              .then(model => setCached(model) || model);
          }
        }
        return cached;
      },
    ); 
};
