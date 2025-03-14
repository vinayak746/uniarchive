import { Router } from "express";
import addBookRoute from "./add.book.route";
import findBooksRoute from "./title.book.route";

const bookRouter: Router = Router();

bookRouter.post("/add", addBookRoute);
bookRouter.post("/title", findBooksRoute);

export default bookRouter;
