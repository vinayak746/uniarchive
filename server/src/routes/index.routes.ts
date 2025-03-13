import { Router } from "express";
import userRouter from "./user.route/index.user.route";
import systemRouter from "./system.route/index.system.route";
import bookRouter from "./book.route/index.book.route";

const ApiRouter: Router = Router();
ApiRouter.use("/user", userRouter);
ApiRouter.use("/system", systemRouter);
ApiRouter.use("/book", bookRouter);

export default ApiRouter;
