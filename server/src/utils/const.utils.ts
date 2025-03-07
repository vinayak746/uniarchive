import { ok } from "assert";
import { config } from "dotenv";
import { type Secret } from "jsonwebtoken";
import logger from "./logger/index.logger.util";

config();

ok(process.env.MONGO_URI, "MONGO_URI is not defined");
ok(process.env.JWT_SECRET, "JWT_SECRET is not defined");
ok(process.env.CLIENT_URL, "CLIENT_URL is not defined");
ok(process.env.QR_ROLL_TIME_S, "QR_ROLL_TIME_S is not defined");

export const PORT: number = parseInt(process.env.PORT || "8080");
export const MONGO_URI: string = process.env.MONGO_URI;
export const JWT_SECRET: Secret = process.env.JWT_SECRET;
export const CLIENT_URL: string = process.env.CLIENT_URL;
export const IS_DEV: boolean = process.env.NODE_ENV !== "production";
let QR_ROLL_TIME_S_Temp: number = 0;
try {
  QR_ROLL_TIME_S_Temp = parseInt(process.env.QR_ROLL_TIME_S);
} catch (error) {
  logger.error("QR_ROLL_TIME_S is not a number");
  QR_ROLL_TIME_S_Temp = 600; // 10 minutes
}
export const QR_ROLL_TIME_S: number = QR_ROLL_TIME_S_Temp;

logger.info({
  env: {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    CLIENT_URL,
    IS_DEV,
    QR_ROLL_TIME_S,
  },
});
