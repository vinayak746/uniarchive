import { MONGO_URI } from "../utils/const.utils";
import { connect, type Mongoose } from "mongoose";
import logger from "../utils/logger/index.logger.util";

export default function connectToDB(): Promise<Mongoose> {
  return new Promise(
    (resolve: (db: Mongoose) => void, reject: (reason?: any) => void): void => {
      logger.info("Connecting to database...");
      connect(MONGO_URI)
        .then((db: Mongoose): void => {
          logger.info("Connected to database");
          db.connection.on("error", (error: any): void => {
            logger.error("Database Error: ", error);
          });
          resolve(db);
        })
        .catch((error: any): void => {
          logger.fatal("Error connecting to database: ", error);
          reject(error);
        });
    }
  );
}
