import {
  getSession,
  type SessionPayload,
} from "../../utils/auth.util/session.auth.util";
import { z, ZodIssue } from "zod";
import type { Request, Response } from "express";
import logger from "../../utils/logger.util/index.logger.util";
import { type ResponseType } from "../../utils/response.util";
import User, { type UserInterface } from "../../db/models/user.model";
import { QR_ROLL_TIME_S } from "../../utils/const.utils";

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

  const qrCodeTime: number = parseInt(atob(code)) / (QR_ROLL_TIME_S * 1000);
  if (isNaN(qrCodeTime)) {
    res.status(200).json({
      success: false,
      errors: [`Invalid code ${code}`],
    });
    return;
  }
  const now: number = Date.now() / (QR_ROLL_TIME_S * 1000);
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
