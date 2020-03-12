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
        [routeByShape(Shape.Next), stream()
          .all(
            files(testDirectory),
            files(testDirectory),
          ),
        ],
        ['*', noop()],
      ],
    )
    .mix(threshold(), oneHot())
    .use(
      sequential()
        .use(dense())
        .use(dense()),
    )
    .use(train());

  await app(next(50));
});
