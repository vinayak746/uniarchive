import path from "node:path";
import { createWriteStream } from "node:fs";
import pino, { type Logger, multistream, type StreamEntry } from "pino";

const streams: StreamEntry[] = [
  {
    level: "info",
    stream: createWriteStream(path.join(__dirname, "info.log")),
  },

  {
    level: "error",
    stream: createWriteStream(path.join(__dirname, "error.log")),
  },
  {
    level: "info",
    stream: process.stdout,
  },
  {
    level: "error",
    stream: process.stderr,
  },
];

const logger: Logger = pino(
  {
    name: "uniarchive",
    level: "info",
  },
  multistream(streams)
);

export default logger;
