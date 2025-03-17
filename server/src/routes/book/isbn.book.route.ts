import { Request, Response } from "express";
import { z } from "zod";
import { ResponseType } from "../../utils/response.util";
import Book, { BookInterface } from "../../db/models/book.model";
import errorsFromZodIssue from "../../utils/validation.util/error.validation.util";
import { Document } from "mongoose";
import {
  getSession,
  SessionPayload,
} from "../../utils/auth.util/session.auth.util";
import BookIssue, { BookIssueInterface } from "../../db/models/issue.model";
import logger from "../../utils/logger.util/index.logger.util";

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
      book: Omit<BookInterface, keyof Document> & {
        available: boolean;
        alreadyBorrowed: boolean | null;
      };
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
      book
        .getAvailalbeCopies()
        .then((available: number): void => {
          const session: SessionPayload | null = getSession(req);
          if (!session) {
            res.json({
              success: true,
              data: {
                book: {
                  ...book.toJSON<BookInterface>(),
                  available: !!available,
                  alreadyBorrowed: null,
                },
              },
            });
            return;
          }
          BookIssue.findOne({
            book: book._id,
            user: session._id,
            returnDate: null,
          })
            .then((issue: BookIssueInterface | null): void => {
              res.json({
                success: true,
                data: {
                  book: {
                    ...book.toJSON<BookInterface>(),
                    available: !!available,
                    alreadyBorrowed: !!issue,
                  },
                },
              });
              return;
            })
            .catch((error: Error): void => {
              res.json({ success: false, errors: [error.message] });
              return;
            });
        })
        .catch((error: Error): void => {
          res.json({ success: false, errors: [error.message] });
          return;
        });
      return;
    })
    .catch((error: Error): void => {
      res.json({ success: false, errors: [error.message] });
      return;
    });
}
