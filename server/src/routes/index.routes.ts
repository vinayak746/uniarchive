import { Router } from "express";
import userRouter from "./user/index.user.route";
import systemRouter from "./system/index.system.route";

const ApiRouter: Router = Router();
ApiRouter.use("/user", userRouter);
ApiRouter.use("/system", systemRouter);

export default ApiRouter;
