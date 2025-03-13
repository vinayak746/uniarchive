import {
  createSession,
  destroySession,
  getSession,
  type SessionPayload,
} from "../../../utils/auth.util/session.auth.util";
import { type Request, type Response } from "express";
import { type ResponseType } from "../../../utils/response.util";
import User, { type UserInterface } from "../../../db/models/user.model";

type RefreshUserResponseData = Pick<UserInterface, "uid" | "name">;

export default function RefreshUserRoute(
  req: Request,
  res: Response<ResponseType<RefreshUserResponseData>>
): void {
  const session: SessionPayload | null = getSession<SessionPayload>(req);
  if (!session) {
    res.json({
      success: false,
      errors: [],
    });
    return;
  }
  const { _id } = session;

  if (!_id) {
    destroySession(res);
    res.json({
      success: false,
      errors: [],
    });
    return;
  }
  User.findById(_id)
    .then((user: UserInterface | null): void | PromiseLike<void> => {
      if (!user) {
        destroySession(res);
        res.json({
          success: false,
          errors: [],
        });
        return;
      }
      createSession(
        {
          _id: user._id,
        },
        res
      );
      res.json({
        success: true,
        data: {
          uid: user.uid,
          name: user.name,
        },
      });
    })
    .catch((error: Error): void => {
      res.json({
        success: false,
        errors: [error.message],
      });
    });
}
