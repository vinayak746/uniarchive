import {
  type UserInterface,
  type UserRoles,
} from "../../../db/models/user.model";
import {
  userNameSchema,
  userPasswordSchema,
  userRoleSchema,
  userUIDSchema,
} from "../../../utils/validation.util/user.validation";
import { z, type ZodIssue } from "zod";
import type { NextFunction, Request, Response } from "express";
import { createUser } from "../../../controller/user.controller";
import { type ResponseType } from "../../../utils/response.util";
import { createSession } from "../../../utils/auth.util/session.auth.util";

type UserRegisterBody = Pick<UserInterface, "name" | "uid" | "role"> & {
  password: string;
};

const userRegisterSchema: z.ZodObject<
  {
    name: z.ZodString;
    uid: z.ZodString;
    password: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRoles>;
  },
  "strip",
  z.ZodTypeAny,
  UserRegisterBody
> = z.object({
  name: userNameSchema,
  uid: userUIDSchema,
  password: userPasswordSchema,
  role: userRoleSchema,
});

export default function UserRegisterRoute(
  req: Request,
  res: Response<ResponseType>,
  next: NextFunction
): void {
  const { success, data, error } = userRegisterSchema.safeParse(req.body);
  if (!success) {
    next(error.errors.map((error: ZodIssue): string => error.message));
    return;
  }

  createUser({
    name: data.name,
    uid: data.uid,
    password: data.password,
    role: data.role,
  })
    .then((user: UserInterface): void => {
      createSession(
        {
          _id: user._id,
        },
        res
      );

      res.json({
        success: true,
      });
    })
    .catch((error: Error): void => {
      res.send({
        success: false,
        errors: [error.message],
      });
    });
}
