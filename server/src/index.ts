import { CLIENT_URL, PORT } from "./utils/const.utils";
import connectToDB from "./db/index.db";
import express, { Request, Response, type Express } from "express";
import logger from "./utils/logger/index.logger";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { join } from "path";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.static(join(__dirname, "public")));

app.get("/", (req: Request, res: Response): void => {
  res.send({
    message: "uniarchive is working",
  });
});

app.listen(PORT, (): void => {
  console.clear();
  logger.info(`Server is running on http://localhost:${PORT}`);
  connectToDB();
});
