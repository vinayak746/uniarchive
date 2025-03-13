import { z, ZodNumber, ZodString } from "zod";
import { BookGenre } from "../../db/models/book.model";

export const bookISBNSchema: ZodString = z
  .string({
    required_error: "ISBN is required",
    invalid_type_error: "ISBN must be a string",
    description: "ISBN is a unique identifier for a book",
  })
  .min(10, {
    message: "ISBN must be at least 10 characters",
  })
  .max(13, {
    message: "ISBN must be at most 13 characters",
  });

export const bookCopiesSchema: ZodNumber = z
  .number({
    required_error: "Copies is required",
    invalid_type_error: "Copies must be a number",
    description: "Copies is the number of books available",
  })
  .int({
    message: "Copies must be an integer",
  })
  .positive({
    message: "Copies must be positive",
  });
export const bookTitleSchema: ZodString = z
  .string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
    description: "Title is the name of the book",
  })
  .min(1, {
    message: "Title must be at least 1 character",
  })
  .max(100, {
    message: "Title must be at most 100 characters",
  });
export const bookAuthorSchema: ZodString = z
  .string({
    required_error: "Author is required",
    invalid_type_error: "Author must be a string",
    description: "Author is the name of the book's author",
  })
  .min(1, {
    message: "Author must be at least 1 character",
  })
  .max(100, {
    message: "Author must be at most 100 characters",
  });
export const bookGenreSchema: z.ZodArray<z.ZodNativeEnum<typeof BookGenre>> =
  z.array(
    z.nativeEnum(BookGenre, {
      message: "Invalid genre",
    }),
    {
      required_error: "Genre is required",
      invalid_type_error: "Genre must be an array",
      description: "Genre is the category of the book",
    }
  );
export const bookPagesSchema: ZodNumber = z
  .number({
    required_error: "Pages is required",
    invalid_type_error: "Pages must be a number",
    description: "Pages is the number of pages in the book",
  })
  .int({
    message: "Pages must be an integer",
  })
  .positive({
    message: "Pages must be positive",
  });
export const bookSummarySchema: ZodString = z
  .string({
    required_error: "Summary is required",
    invalid_type_error: "Summary must be a string",
    description: "Summary is a brief description of the book",
  })
  .min(1, {
    message: "Summary must be at least 1 character",
  })
  .max(1000, {
    message: "Summary must be at most 1000 characters",
  });
export const bookCoverImageUrlSchema: ZodString = z
  .string({
    required_error: "Cover image URL is required",
    invalid_type_error: "Cover image URL must be a string",
    description: "Cover image URL is the URL of the book's cover image",
  })
  .url({
    message: "Invalid URL",
  })
  .min(1, {
    message: "Cover image URL must be at least 1 character",
  })
  .max(1000, {
    message: "Cover image URL must be at most 1000 characters",
  });
export const bookRatingSchema: ZodNumber = z
  .number({
    required_error: "Rating is required",
    invalid_type_error: "Rating must be a number",
    description: "Rating is the average rating of the book",
  })
  .int({
    message: "Rating must be an integer",
  })
  .min(1, {
    message: "Rating must be at least 1",
  })
  .max(5, {
    message: "Rating must be at most 5",
  });
