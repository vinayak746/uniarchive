import { JSX } from "react";
import { useLoaderData } from "react-router-dom";
import { BookGenre, BookInterface } from "../../../types/books.types";
import ISBNBookLoader from "./isbn.books.loader";
import { Star } from "lucide-react";

/**
 //  title: string;
 //  summary: string;
 //  coverImageUrl: string;
 //  rating: number;
 //  authors: string[];
 //  isbn: string;
   copies: number;
   genres: BookGenre[];
   pages: number;
 */

function BookByISBNPage(): JSX.Element {
  const {
    book,
  }: {
    book: BookInterface;
  } = useLoaderData<typeof ISBNBookLoader>() as {
    book: BookInterface;
  };
  return (
    <div
      className={`flex flex-col justify-center items-center lg:flex-row gap-4 sm:gap-8 grow`}>
      <img
        loading={"lazy"}
        src={book.coverImageUrl}
        alt={book.title}
        className="h-full  aspect-[8.27/11.69] object-cover rounded-2xl"
      />
      <div className={`flex flex-col gap-2`}>
        <div className={`w-full text-lg sm:text-2xl font-semibold`}>
          <div className={`pb-4`} title={book.isbn}>
            {book.title}
          </div>
          <div className={`text-dark/80 text-sm lg:max-w-lg`}>
            {book.authors.join(", ")}
          </div>
        </div>
        <div>
          <div>
            <div className={`flex items-center gap-1`}>
              <div className={`sm:font-medium`}>Rating: &nbsp;</div>
              {Array(5)
                .fill(0)
                .map(
                  (_: number, i: number): JSX.Element => (
                    <Star
                      key={i}
                      size={20}
                      fill={"currentColor"}
                      className={`${
                        i < book.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  )
                )}
            </div>
          </div>
        </div>
        <div className={`text-dark/80 w-full text-sm sm:text-base lg:max-w-lg`}>
          {/* implement elipsis for book.summary */}
          {book.summary.length > 300
            ? book.summary.slice(0, 300) + "..."
            : book.summary}
        </div>
        <div className={`flex flex-col gap-4`}>
          <div className={`flex gap-4`}>
            <div>Copies: {book.copies}</div>
            <div>Pages: {book.pages || "N/A"}</div>
          </div>
          <div className={`flex gap-2 flex-wrap lg:max-w-lg`}>
            {book.genres.map(
              (genre: BookGenre, index: number): JSX.Element => (
                <span
                  key={index}
                  className={`text-sm py-1 px-2 text-white font-medium rounded-full bg-dark/80`}>
                  {genre}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookByISBNPage;
