import { Router } from "express";
import userRouter from "./user/index.user.route";
import systemRouter from "./system/index.system.route";
import bookRouter from "./book/index.book.route";

const ApiRouter: Router = Router();
ApiRouter.use("/user", userRouter);
ApiRouter.use("/system", systemRouter);
ApiRouter.use("/book", bookRouter);

export default ApiRouter;
