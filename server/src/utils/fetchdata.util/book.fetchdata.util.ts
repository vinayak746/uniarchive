import { type Document } from "mongoose";
import { BookGenre, type BookInterface } from "../../db/models/book.model";
import axios, { type AxiosResponse } from "axios";

export function fetchBookData(
  isbn: string
): Promise<Omit<BookInterface, keyof Document>> {
  return new Promise(
    (
      resolve: (value: Omit<BookInterface, keyof Document>) => void,
      reject: (reason?: any) => void
    ): void => {
      try {
        axios
          .get(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
          )
          .then(
            ({
              data,
            }: AxiosResponse<{
              [k in string]: {
                title: string;
                authors: { name: string }[];
                cover: { large: string; medium: string; small: string };
                number_of_pages: number;
                key: string;
              };
            }>): void => {
              const book: {
                title: string;
                authors: { name: string }[];
                cover: { large: string; medium: string; small: string };
                number_of_pages: number;
                key: string;
              } = data[`ISBN:${isbn}`];

              if (!book) {
                return reject(new Error(`Book with isbn ${isbn} not found`));
              }
              const title: string = book.title || "Unknown Title";
              const authors: string[] = book.authors
                ? book.authors.map((a: { name: string }): string => a.name)
                : ["Unknown Author"];
              const coverImageUrl: string = book.cover
                ? book.cover.large || book.cover.medium || book.cover.small
                : "https://cdn.dribbble.com/userupload/37509620/file/original-c5c57df0526dada049304bacd6d0998b.png?resize=1600x1200&vertical=center";
              const pages: number = book.number_of_pages || 0;
              const workKey: string = book.key; // e.g., "/works/OL82563W"

              let summary: string = "Summary not available.";
              let rating: number = 0;

              if (workKey) {
                axios
                  .get(`https://openlibrary.org${workKey}.json`)
                  .then(
                    (
                      workResponse: AxiosResponse<{
                        description?: string | { value: string };
                      }>
                    ): void => {
                      const {
                        description,
                      }: {
                        description?:
                          | string
                          | {
                              value: string;
                            };
                      } = workResponse.data;
                      if (description) {
                        summary =
                          typeof description === "string"
                            ? description
                            : description.value;
                      }
                      axios
                        .get(`https://openlibrary.org${workKey}/ratings.json`)
                        .then(
                          ({
                            data,
                          }: AxiosResponse<{
                            summary: {
                              average: number;
                            };
                          }>): void => {
                            if (data.summary) {
                              rating = data.summary.average || 0;
                            }
                            const availableGenres: BookGenre[] =
                              Object.values(BookGenre);
                            const genres: BookGenre[] = availableGenres.filter(
                              (): boolean => Math.random() > 0.5
                            );
                            if (genres.length === 0) {
                              genres.push(
                                availableGenres[
                                  Math.floor(
                                    Math.random() * availableGenres.length
                                  )
                                ]
                              );
                            }

                            const bookInfo: Omit<
                              BookInterface,
                              keyof Document
                            > = {
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
                            resolve(bookInfo);
                          }
                        )
                        .catch(reject);
                    }
                  )
                  .catch(reject);
              }
            }
          )
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    }
  );
}
