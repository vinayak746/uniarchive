import { Request, Response } from "express";
import { z } from "zod";
import {
  getSession,
  SessionPayload,
} from "../../utils/auth.util/session.auth.util";
import { ResponseType } from "../../utils/response.util";
import User, { UserInterface } from "../../db/models/user.model";
import logger from "../../utils/logger.util/index.logger.util";
import errorsFromZodIssue from "../../utils/validation.util/error.validation.util";
import Book, { BookInterface } from "../../db/models/book.model";
import BookIssue, {
  BookIssueInterface,
  IssueStatus,
} from "../../db/models/issue.model";
import { bookISBNSchema } from "../../utils/validation.util/book.validation";
import { isObjectIdOrHexString } from "mongoose";

const issueBookSchema: z.ZodObject<{
  book: z.ZodEffects<z.ZodString, string, string>;
}> = z.object({
  book: z
    .string()
    .refine((book: string): boolean => isObjectIdOrHexString(book), {
      message: "Invalid Book ID",
    }),
});

export default function issueBookRoute(
  req: Request,
  res: Response<
    ResponseType<{
      issued: boolean; // true if book was issued, false if book was returned
    }>
  >
): void {
  const session: SessionPayload | null = getSession(req);
  if (!session) {
    res.json({
      success: false,
      errors: ["You must be logged in to issue/return a book"],
    });
    return;
  }
  User.findById(session._id)
    .then((user: UserInterface | null): void => {
      if (!user) {
        res.json({
          success: false,
          errors: ["User not found"],
        });
        return;
      }
      const { success, data, error } = issueBookSchema.safeParse(req.body);
      if (!success) {
        res.json({
          success: false,
          errors: errorsFromZodIssue(error),
        });
        return;
      }
      Book.findById(data.book)
        .then((book: BookInterface | null): void => {
          if (!book) {
            res.json({
              success: false,
              errors: ["Book not found"],
            });
            return;
          }
          BookIssue.findOne({
            book: book._id,
            user: user._id,
            returnDate: null,
          })
            .then((issue: BookIssueInterface | null): void => {
              if (issue) {
                issue.returnBook();
                issue
                  .save()
                  .then((): void => {
                    res.json({
                      success: true,
                      data: {
                        issued: false,
                      },
                    });
                  })
                  .catch((err: Error): void => {
                    res.json({
                      success: false,
                      errors: [err.message],
                    });
                  });
                return;
              }
              book
                .getAvailalbeCopies()
                .then((copies: number): void => {
                  if (copies <= 0) {
                    res.json({
                      success: false,
                      errors: ["No copies available"],
                    });
                    return;
                  }
                  const issue = new BookIssue({
                    book: book._id,
                    user: user._id,
                  });
                  issue
                    .save()
                    .then((): void => {
                      res.json({
                        success: true,
                        data: {
                          issued: true,
                        },
                      });
                    })
                    .catch((err: Error): void => {
                      res.json({
                        success: false,
                        errors: [err.message],
                      });
                    });
                })
                .catch((err: Error): void => {
                  res.json({
                    success: false,
                    errors: [err.message],
                  });
                });
            })
            .catch((err: Error): void => {
              res.json({
                success: false,
                errors: [err.message],
              });
            });
        })
        .catch((err: Error): void => {
          res.json({
            success: false,
            errors: [err.message],
          });
        });
    })
    .catch((err: Error): void => {
      logger.error(err.message);
      res.json({
        success: false,
        errors: [err.message],
      });
    });
}
