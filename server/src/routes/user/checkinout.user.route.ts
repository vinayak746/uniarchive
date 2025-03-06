import {
  getSession,
  type SessionPayload,
} from "../../utils/auth/session.auth.util";
import { z, ZodIssue } from "zod";
import type { Request, Response } from "express";
import logger from "../../utils/logger/index.logger.util";
import { type ResponseType } from "../../utils/response.util";
import User, { type UserInterface } from "../../db/models/user.model";

const checkInOutSchema = z.object({
  code: z.string({
    required_error: "Code is required",
    invalid_type_error: "Code must be a string",
  }),
});

export default function CheckInOutUserRoute(
  req: Request,
  res: Response<ResponseType<Pick<UserInterface, "checkedIn">>>
): void {
  const session: SessionPayload | null = getSession<SessionPayload>(req);
  if (!session) {
    res.status(200).json({
      success: false,
      errors: ["Unauthorized"],
    });
    return;
  }
  const { data, success, error } = checkInOutSchema.safeParse(req.body);
  if (!success) {
    res.status(200).json({
      success: false,
      errors: error.errors.map((err: ZodIssue): string => err.message),
    });
    return;
  }
  const { code } = data;

  const qrCodeTime: number = parseInt(Buffer.from(code, "base64").toString());
  logger.info(`QR Code Time: ${qrCodeTime}`);
  if (isNaN(qrCodeTime)) {
    res.status(200).json({
      success: false,
      errors: ["Invalid code"],
    });
    return;
  }
  const now: number = Date.now() / (40 * 1000);
  if (Math.abs(now - qrCodeTime) > 1) {
    res.status(200).json({
      success: false,
      errors: ["Code expired"],
    });
    return;
  }

  User.findById(session._id)
    .then((user: UserInterface | null): void => {
      if (!user) {
        res.status(200).json({
          success: false,
          errors: ["Unauthorized"],
        });
        return;
      }
      user.checkedIn = !user.checkedIn;
      user
        .save()
        .then((): void => {
          res.status(200).json({
            success: true,
            data: {
              checkedIn: user.checkedIn,
            },
          });
        })
        .catch((err: Error): void => {
          logger.error(err);
          res.status(200).json({
            success: false,
            errors: ["Cannot update user"],
          });
        });
    })
    .catch((err: Error): void => {
      logger.error(err);
      res.status(200).json({
        success: false,
        errors: ["Cannot find user"],
      });
    });
}
