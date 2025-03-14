import { Request, Response } from "express";
import { z } from "zod";
import {
  bookAuthorSchema,
  bookCopiesSchema,
  bookCoverImageUrlSchema,
  bookGenreSchema,
  bookISBNSchema,
  bookPagesSchema,
  bookRatingSchema,
  bookSummarySchema,
  bookTitleSchema,
} from "../../utils/validation.util/book.validation";
import Book, { BookGenre, BookInterface } from "../../db/models/book.model";
import { ResponseType } from "../../utils/response.util";
import errorsFromZodIssue from "../../utils/validation.util/error.validation.util";
import { fetchBookData } from "../../utils/fetchdata.util/book.fetchdata.util";
import { Document } from "mongoose";
import logger from "../../utils/logger.util/index.logger.util";

const bookAddSchema: z.ZodObject<{
  isbn: z.ZodString;
}> = z.object({
  isbn: bookISBNSchema,
});

export default function addBookRoute(
  req: Request<{
    isbn: string;
  }>,
  res: Response<
    ResponseType<{
      title: string;
    }>
  >
): void {
  const { success, data, error } = bookAddSchema.safeParse(req.body);
  if (!success) {
    res.json({ success: false, errors: errorsFromZodIssue(error) });
    return;
  }
  const { isbn } = data;
  fetchBookData(isbn)
    .then((bookData: Omit<BookInterface, keyof Document>): void => {
      Book.findOne({
        isbn: bookData.isbn,
      })
        .then((book: BookInterface | null): void => {
          if (book) {
            res.json({
              success: false,
              errors: ["Book already exists"],
            });
            return;
          }
          const newBook = new Book(bookData);
          newBook
            .save()
            .then((): void => {
              res.json({
                success: true,
                data: {
                  title: bookData.title,
                },
              });
            })
            .catch((err: Error): void => {
              res.json({ success: false, errors: ["Cannot save user"] });
            });
        })
        .catch((err: Error): void => {
          res.json({ success: false, errors: ["Cannot find user"] });
        });
    })
    .catch((err: Error): void => {
      res.json({ success: false, errors: [err.message] });
    });
}
