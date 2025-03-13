import { Router } from "express";
import addBookRoute from "./add.book.route";
import findBookRoute from "./find.book.route";

const bookRouter: Router = Router();

bookRouter.post("/add", addBookRoute);
bookRouter.post("/find", findBookRoute);

export default bookRouter;
