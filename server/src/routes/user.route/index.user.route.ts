import { Router } from "express";
import userAuthRouter from "./auth.user/index.user.auth.route";
import CheckInOutUserRoute from "./checkinout.user.route";

const userRouter: Router = Router();

userRouter.use("/auth", userAuthRouter);
userRouter.post("/checkinout", CheckInOutUserRoute);

export default userRouter;
