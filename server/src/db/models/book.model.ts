import {
  CallbackWithoutResultAndOptionalError,
  type Document,
  type Model,
  model,
  Schema,
} from "mongoose";
import BookIssue, { BookIssueInterface } from "./issue.model";

export enum BookGenre {
  DRAMA = "Drama",
  FANTASY = "Fantasy",
  BUSINESS = "Business",
  DETECTIVE = "Detective",
  EDUCATION = "Education",
  PSYCHOLOGY = "Psychology",
}
export interface BookInterface extends Document {
  isbn: string;
  copies: number;
  title: string;
  authors: string[];
  genres: BookGenre[];
  pages: number;
  summary: string;
  coverImageUrl: string;
  rating: number;
  getAvailalbeCopies: () => Promise<number>;
}

const BookSchema = new Schema<BookInterface>({
  isbn: {
    type: String,
    index: true,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 13,
  },
  copies: {
    type: Number,
    required: true,
    default: 1,
  },
  title: { type: String, required: true, index: true },
  authors: {
    type: [{ type: String, required: true }],
    validate: [
      (authors: string[]): boolean => !!authors.length,
      "At least one author is required",
    ],
    index: true,
  },
  coverImageUrl: { type: String, required: true },
  genres: {
    type: [
      {
        type: String,
        enum: Object.values(BookGenre),
        required: true,
      },
    ],
    index: true,
    validate: [
      (genres: BookGenre[]): boolean => !!genres.length,
      "At least one genre is required",
    ],
  },
  pages: { type: Number, required: true },
  rating: { type: Number, required: true, default: 0, max: 5 },
  summary: { type: String, required: false, default: "" },
});

BookSchema.pre(
  "save",
  function (next: CallbackWithoutResultAndOptionalError): void {
    const book: BookInterface = this;
    book.isbn = book.isbn.replaceAll("-", "");
    book.coverImageUrl =
      book.coverImageUrl ||
      `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
    next();
  }
);

BookSchema.methods.getAvailalbeCopies = function (): Promise<number> {
  return new Promise(
    (
      resolve: (value: number) => void,
      reject: (reason?: unknown) => void
    ): void => {
      BookIssue.find({
        book: this._id,
        returnDate: null,
      })
        .then((issues: BookIssueInterface[]): void => {
          resolve(this.copies - issues.length);
        })
        .catch(reject);
    }
  );
};

const Book: Model<BookInterface> = model<BookInterface>("Book", BookSchema);

export default Book;
