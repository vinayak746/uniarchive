import {
  userPasswordSchema,
  userUIDSchema,
} from "../../../utils/validation/user.validation";
import { z, type ZodIssue } from "zod";
import { type Request, type Response } from "express";
import { getUser } from "../../../controller/user.controller";
import { type ResponseType } from "../../../utils/response.util";
import { type UserInterface } from "../../../db/models/user.model";
import { createSession } from "../../../utils/auth/session.auth.util";

type UserLoginBody = Pick<UserInterface, "uid"> & {
  password: string;
};

const userLoginSchema: z.ZodObject<
  {
    uid: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  UserLoginBody
> = z.object({
  uid: userUIDSchema,
  password: userPasswordSchema,
});

export default function UserLoginRoute(
  req: Request,
  res: Response<ResponseType>
): void {
  const { success, data, error } = userLoginSchema.safeParse(req.body);
  if (!success) {
    res.json({
      success: false,
      errors: error.errors.map((error: ZodIssue): string => error.message),
    });
    return;
  }

  getUser(data.uid)
    .then((user: UserInterface): void => {
      user
        .comparePassword(data.password)
        .then((isMatch: boolean): void => {
          if (!isMatch) {
            res.json({
              success: false,
              errors: ["Incorrect password"],
            });
            return;
          }
          createSession({ _id: user._id }, res);
          res.json({
            success: true,
          });
        })
        .catch((error: Error): void => {
          res.json({
            success: false,
            errors: [error.message],
          });
        });
    })
    .catch((error: Error): void => {
      res.send({
        success: false,
        errors: [error.message],
      });
    });
}
