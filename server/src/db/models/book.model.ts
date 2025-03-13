import { type Document, type Model, model, Schema } from "mongoose";

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
  author: string;
  genre: BookGenre[];
  pages: number;
  summary: string;
  coverImageUrl: string;
  rating: number;
}

const BookSchema = new Schema<BookInterface>({
  isbn: { type: String, required: true, unique: true },
  copies: {
    type: Number,
    required: true,
    default: 1,
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  genre: [
    {
      type: String,
      enum: Object.values(BookGenre),
      required: true,
    },
  ],
  pages: { type: Number, required: true },
  rating: { type: Number, required: true, default: 0 },
  summary: { type: String, required: false, default: "" },
});

const Book: Model<BookInterface> = model<BookInterface>("Book", BookSchema);

export default Book;
