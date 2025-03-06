import { ok } from "assert";
import { config } from "dotenv";
import { type Secret } from "jsonwebtoken";
import logger from "./logger/index.logger.util";

config();

ok(process.env.MONGO_URI, "MONGO_URI is not defined");
ok(process.env.JWT_SECRET, "JWT_SECRET is not defined");
ok(process.env.CLIENT_URL, "CLIENT_URL is not defined");

export const PORT: string | number = process.env.PORT || 8080;
export const MONGO_URI: string = process.env.MONGO_URI;
export const JWT_SECRET: Secret = process.env.JWT_SECRET;
export const CLIENT_URL: string = process.env.CLIENT_URL;

logger.info({
  PORT,
  MONGO_URI,
  JWT_SECRET,
  CLIENT_URL,
});
