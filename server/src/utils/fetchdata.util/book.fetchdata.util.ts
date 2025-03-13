import { Document } from "mongoose";
import Book, { BookGenre, BookInterface } from "../../db/models/book.model";
import logger from "../logger.util/index.logger.util";

export function fetchBookData(
  isbn: string
): Promise<Omit<BookInterface, keyof Document>> {
  return new Promise(async (resolve, reject) => {
    try {
      const bookResponse: Response = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
      );
      const bookData = await bookResponse.json();
      const book = bookData[`ISBN:${isbn}`];

      if (!book) return reject(new Error(`Book with isbn ${isbn} not found`));

      const title = book.title || "Unknown Title";
      const authors = book.authors
        ? book.authors.map((a: any) => a.name)
        : ["Unknown Author"];
      const coverImageUrl = book.cover
        ? book.cover.large || book.cover.medium || book.cover.small
        : "https://cdn.dribbble.com/userupload/37509620/file/original-c5c57df0526dada049304bacd6d0998b.png?resize=1600x1200&vertical=center";
      const pages = book.number_of_pages || 0;
      const workKey = book.key; // e.g., "/works/OL82563W"

      let summary = "Summary not available.";
      let rating = 0;

      // Fetch Summary
      if (workKey) {
        const workResponse = await fetch(
          `https://openlibrary.org${workKey}.json`
        );
        const workData = await workResponse.json();
        if (workData.description) {
          summary =
            typeof workData.description === "string"
              ? workData.description
              : workData.description.value;
        }
      }

      // Fetch Rating
      if (workKey) {
        const ratingResponse: Response = await fetch(
          `https://openlibrary.org${workKey}/ratings.json`
        );
        const ratingData = await ratingResponse.json();
        if (ratingData.summary) {
          rating = ratingData.summary.average || 0;
        }
      }

      const availableGenres: BookGenre[] = Object.values(BookGenre);
      const genres: BookGenre[] = availableGenres.filter(
        (): boolean => Math.random() > 0.5
      );
      if (genres.length === 0) {
        genres.push(
          availableGenres[Math.floor(Math.random() * availableGenres.length)]
        );
      }

      const bookInfo: Omit<BookInterface, keyof Document> = {
        isbn,
        copies: Math.floor(Math.random() * 10) + 1,
        title,
        authors,
        genres,
        pages,
        summary,
        coverImageUrl,
        rating,
      };
      logger.info(`Fetched book: ${title}`);
      resolve(bookInfo);
    } catch (error) {
      reject(error);
    }
  });
}
