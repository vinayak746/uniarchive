import { Request, Response } from "express";
import BookIssue, { BookIssueInterface } from "../../db/models/issue.model";
import { ResponseType } from "../../utils/response.util";
import { BookInterface } from "../../db/models/book.model";
import { isObjectIdOrHexString, ObjectId } from "mongoose";

export default function recomemdedBookRoute(
  _req: Request,
  res: Response<
    ResponseType<{
      books: Pick<
        BookInterface,
        "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
      >[];
    }>
  >
): void {
  BookIssue.find(
    {},
    {
      book: 1,
    }
  )
    .populate(["book"])
    .then(
      (
        issues: (Omit<BookIssueInterface, "book"> & {
          book: BookInterface | ObjectId;
        })[]
      ): void => {
        const books: (BookInterface | ObjectId)[] = issues.map(
          (issue: {
            book: BookInterface | ObjectId;
          }): BookInterface | ObjectId => issue.book
        );
        const topBooks: {
          [key: string]: number;
        } = books.reduce(
          (
            acc: {
              [key: string]: number;
            },
            bookId: BookInterface | ObjectId
          ): {
            [key: string]: number;
          } => {
            if (isObjectIdOrHexString(bookId)) {
              return acc;
            }
            bookId = (bookId as BookInterface)._id as ObjectId;
            if (acc[String(bookId)]) {
              acc[String(bookId)]++;
            } else {
              acc[String(bookId)] = 1;
            }
            return acc;
          },
          {}
        );

        let sortedBooks: [string, number][] = Object.entries(topBooks).sort(
          (a: [string, number], b: [string, number]): number => {
            return b[1] - a[1];
          }
        );

        if (sortedBooks.length > 3) {
          sortedBooks = sortedBooks.slice(0, 3);
        }

        res.status(200).json({
          success: true,
          data: {
            books: sortedBooks.map(
              ({
                0: topBookId,
              }: [string, number]): Pick<
                BookInterface,
                "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
              > => {
                const book: Pick<
                  BookInterface,
                  "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
                > = books.find((book: BookInterface | ObjectId): boolean => {
                  if (isObjectIdOrHexString(book)) {
                    return false;
                  }
                  book = book as BookInterface;
                  return String(book._id) === topBookId;
                }) as Pick<
                  BookInterface,
                  "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
                >;
                return {
                  coverImageUrl: book.coverImageUrl,
                  isbn: book.isbn,
                  summary: book.summary,
                  authors: book.authors,
                  rating: book.rating,
                };
              }
            ),
          },
        });
      }
    )
    .catch((error: Error) => {
      res.status(500).json({
        success: false,
        errors: ["Error fetching recommended books"],
      });
    });
}
