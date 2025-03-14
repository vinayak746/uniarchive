import { Request, Response } from "express";
import { z } from "zod";
import { ResponseType } from "../../utils/response.util";
import Book, { BookInterface } from "../../db/models/book.model";
import errorsFromZodIssue from "../../utils/validation.util/error.validation.util";

const findTitleBooksSchema: z.ZodObject<{
  filter: z.ZodObject<{
    isbn: z.ZodOptional<z.ZodString>;
  }>;
}> = z.object({
  filter: z.object({
    isbn: z.string().optional(),
  }),
});

export default function findISBNBookRoute(
  req: Request,
  res: Response<
    ResponseType<{
      book: Omit<BookInterface, keyof Document>;
    }>
  >
): void {
  const { filter } = req.body;

  const { success, data, error } = findTitleBooksSchema.safeParse({
    filter,
  });
  if (!success) {
    res.json({ success: false, errors: errorsFromZodIssue(error) });
    return;
  }
  Book.findOne(
    data.filter
      ? {
          isbn: data.filter.isbn,
        }
      : {}
  )
    .then((book: BookInterface | null): void => {
      if (!book) {
        res.json({ success: false, errors: ["Book not found"] });
        return;
      }
      res.json({
        success: true,
        data: {
          book: book,
        },
      });
      return;
    })
    .catch((error: Error): void => {
      res.json({ success: false, errors: [error.message] });
      return;
    });
}
