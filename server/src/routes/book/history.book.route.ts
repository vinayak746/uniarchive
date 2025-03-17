import { Request, Response } from "express";
import {
  getSession,
  SessionPayload,
} from "../../utils/auth.util/session.auth.util";
import User, { UserInterface } from "../../db/models/user.model";
import Book, { BookInterface } from "../../db/models/book.model";
import BookIssue, {
  BookIssueInterface,
  IssueStatus,
} from "../../db/models/issue.model";
import { ResponseType } from "../../utils/response.util";
import { Document, isObjectIdOrHexString, ObjectId } from "mongoose";
import logger from "../../utils/logger.util/index.logger.util";

export default function historyBookRoute(
  req: Request,
  res: Response<
    ResponseType<
      {
        _id: ObjectId;
        book: Omit<Omit<BookInterface, keyof Document>, "getAvailableCopies">;
        issueDate: Date;
        dueDate: Date;
        returnDate: Date;
        fineAmount: number;
        status: IssueStatus;
      }[]
    >
  >
): void {
  const session: SessionPayload | null = getSession(req);
  if (!session) {
    res.json({ success: false, errors: ["Not logged in"] });
    return;
  }
  User.findById(session._id)
    .then((user: UserInterface | null): void => {
      if (!user) {
        res.json({ success: false, errors: ["User not found"] });
        return;
      }
      BookIssue.find(
        {
          user: user._id,
        },
        {},
        {
          populate: ["book"],
        }
      )
        .then(
          (
            issues: (Omit<BookIssueInterface, "book"> & {
              book: BookInterface | ObjectId;
            })[]
          ): void => {
            const history: (Omit<BookIssueInterface, "book"> & {
              book: BookInterface;
            })[] = issues.filter(
              (
                issue: Omit<BookIssueInterface, "book"> & {
                  book: BookInterface | ObjectId;
                }
              ): boolean => !isObjectIdOrHexString(issue.book)
            ) as (Omit<BookIssueInterface, "book"> & {
              book: BookInterface;
            })[];
            res.json({
              success: true,
              data: history.map(
                (
                  issue: Omit<BookIssueInterface, "book"> & {
                    book: BookInterface;
                  }
                ): {
                  _id: ObjectId;
                  book: Omit<
                    Omit<BookInterface, keyof Document>,
                    "getAvailableCopies"
                  >;
                  issueDate: Date;
                  dueDate: Date;
                  returnDate: Date;
                  fineAmount: number;
                  status: IssueStatus;
                } => {
                  console.log({
                    issue: {
                      ...issue,
                      book: null,
                    },
                  });
                  return {
                    _id: issue._id as ObjectId,
                    book: issue.book,
                    issueDate: issue.issueDate,
                    dueDate: issue.dueDate,
                    returnDate: issue.returnDate,
                    fineAmount: issue.fineAmount,
                    status: issue.status,
                  };
                }
              ),
            });
          }
        )
        .catch((err: Error): void => {
          res.json({ success: false, errors: ["Server error"] });
        });
    })
    .catch((err: Error): void => {
      res.json({ success: false, errors: ["Server error"] });
    });
}
