import { Router } from "express";
import addBookRoute from "./add.book.route";

const bookRouter: Router = Router();

bookRouter.post("/add", addBookRoute);

export default bookRouter;
