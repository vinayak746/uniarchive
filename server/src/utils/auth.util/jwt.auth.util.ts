import { JWT_SECRET } from "../const.utils";
import { verify, sign } from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

export { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
export type { JwtPayload } from "jsonwebtoken";

export function signJWT<T = object>(
  data: T,
  options: SignOptions = {
    expiresIn: "24h",
  }
): string {
  const payload: JwtPayload = {
    data,
  };
  return sign(payload, JWT_SECRET, options);
}

export function verifyJWT<T = object>(token: string): T {
  const { data } = verify(token, JWT_SECRET) as JwtPayload;
  return data;
}
