import { type Request, type Response } from "express";
import { destroySession } from "../../../utils/auth.util/session.auth.util";

export default function LogoutUserRoute(req: Request, res: Response): void {
  destroySession(res);
  res.json({
    success: true,
  });
}
