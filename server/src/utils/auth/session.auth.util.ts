import type { Request, Response } from "express";
import { signJWT, verifyJWT } from "./jwt.auth.util";
import logger from "../logger/index.logger.util";
import { IS_DEV } from "../const.utils";

export interface SessionPayload {
  _id?: string;
}

export function createSession<T = SessionPayload>(
  payload: T,
  res: Response
): void {
  const token: string = signJWT<T>(payload);

  logger.info({ NODE_ENV: process.env.NODE_ENV });

  res.cookie("session", token, {
    sameSite: "none",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export function getSession<T = SessionPayload>(req: Request): T | null {
  const token: string = req.cookies["session"];
  logger.info({ token: token || "token undefined" });
  logger.info({ cookies: req.cookies || "cookies undefined" });
  if (!token) {
    return null;
  }
  try {
    return verifyJWT<T>(token);
  } catch (error) {
    return null;
  }
}

export function destroySession(res: Response): void {
  res.clearCookie("session");
}
