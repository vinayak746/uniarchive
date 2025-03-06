import { IS_DEV } from "../const.utils";
import type { Request, Response } from "express";
import { signJWT, verifyJWT } from "./jwt.auth.util";

export interface SessionPayload {
  _id?: string;
}

export function createSession<T = SessionPayload>(
  payload: T,
  res: Response
): void {
  const token: string = signJWT<T>(payload);

  res.cookie("session", token, {
    sameSite: IS_DEV ? "lax" : "none",
    path: "/",
    httpOnly: true,
    secure: !IS_DEV,
  });
}

export function getSession<T = SessionPayload>(req: Request): T | null {
  const token: string = req.cookies["session"];
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
