import { Router } from "express";
import addBookRoute from "./add.book.route";
import findTitleBooksRoute from "./title.book.route";
import findISBNBookRoute from "./isbn.book.route";
import issueBookRoute from "./issue.book.route";

const bookRouter: Router = Router();

bookRouter.post("/add", addBookRoute);
bookRouter.post("/title", findTitleBooksRoute);
bookRouter.post("/isbn", findISBNBookRoute);
bookRouter.post("/issue", issueBookRoute);

export default bookRouter;
