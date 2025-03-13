import { type Request, type Response } from "express";
import { destroySession } from "../../../utils/auth.util/session.auth.util";
import logger from "../../../utils/logger.util/index.logger.util";

export default function LogoutUserRoute(req: Request, res: Response): void {
  logger.info({ cookies: req.cookies });
  destroySession(res);
  res.json({
    success: true,
  });
}
