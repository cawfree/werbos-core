import "@babel/polyfill";
import "@tensorflow/tfjs-node";

import fs from "fs";
import { noop } from "rippleware";
import { tmpdir } from "os";
import { sep } from "path";

import werbos, { stream, next, files, Shape, routeByShape } from "../src";

const testDirectory = `${tmpdir()}${sep}mnist-stream`;

const createTestDirectory = (n = 1000) => {
  if (!fs.existsSync(testDirectory)) {
    fs.mkdirSync(testDirectory);
  }
  [...Array(n)].map(
    (_, i) => fs.writeFileSync(
      `${testDirectory}${sep}${i}.json`,
      JSON.stringify(
        {
          x: Math.random(),
          y: Math.random(),
        },
      ),
    ),
  );
};

it("should be capable of incrementally streaming data", async () => {

  createTestDirectory();

  const app = werbos()
    .all(
      [
        // TODO: Eventually, we'll need to abstract this kind of functionality.
        // TODO: A nice, configurable way to access the stream.
        [routeByShape(Shape.Next), stream()
          .all(
            files(testDirectory),
            files(testDirectory),
          )
          // XXX: need this to split as expcted
          .use(e => e, e => e),
        ],
        ['*', noop()],
      ],
    )
    .use(
      console.log,
      console.log,
    );

  await app(next());
});
