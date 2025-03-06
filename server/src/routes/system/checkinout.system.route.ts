import { type Request, type Response } from "express";
import { type ResponseType } from "../../utils/response.util";

export default function CheckInOutSystemRoute(
  req: Request,
  res: Response<
    ResponseType<{
      code: string;
    }>
  >
): void {
  const now: number = Math.floor(Date.now() / (40 * 1000));
  // data for qrcode for checkin/out
  const code: string = Buffer.from(now.toString()).toString("base64");

  res.status(200).json({
    success: true,
    data: {
      code,
    },
  });
}
