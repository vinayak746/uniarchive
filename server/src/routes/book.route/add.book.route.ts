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

const bookAddSchema: z.ZodObject<{
  isbn: z.ZodString;
  copies: z.ZodNumber;
  title: z.ZodString;
  author: z.ZodString;
  genre: z.ZodArray<z.ZodNativeEnum<typeof BookGenre>, "many">;
  pages: z.ZodNumber;
  summary: z.ZodString;
  coverImageUrl: z.ZodString;
  rating: z.ZodNumber;
}> = z.object({
  isbn: bookISBNSchema,
  copies: bookCopiesSchema,
  title: bookTitleSchema,
  author: bookAuthorSchema,
  genre: bookGenreSchema,
  pages: bookPagesSchema,
  summary: bookSummarySchema,
  coverImageUrl: bookCoverImageUrlSchema,
  rating: bookRatingSchema,
});

export default function addBookRoute(
  req: Request,
  res: Response<ResponseType>
): void {
  const { success, data, error } = bookAddSchema.safeParse(req.body);
  if (!success) {
    res.json({ success: false, errors: errorsFromZodIssue(error) });
    return;
  }
  const book = new Book(data);
  book
    .save()
    .then((): void => {
      res.json({ success: true });
    })
    .catch((err: Error): void => {
      res.json({ success: false, errors: [err.message] });
    });
}
