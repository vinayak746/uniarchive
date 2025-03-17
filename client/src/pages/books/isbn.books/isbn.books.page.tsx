import { JSX } from "react";
import { Star } from "lucide-react";
import ISBNBookLoader from "./isbn.books.loader";
import { Form, Link, useLoaderData } from "react-router-dom";
import Button from "../../../components/button.component";
import { BookGenre, BookInterface } from "../../../types/books.types";

function BookByISBNPage(): JSX.Element {
  const {
    book,
  }: {
    book: BookInterface & {
      available: boolean;
      alreadyBorrowed: boolean | null;
    };
  } = useLoaderData<typeof ISBNBookLoader>() as {
    book: BookInterface & {
      available: boolean;
      alreadyBorrowed: boolean | null;
    };
  };
  return (
    <div
      className={`flex flex-col justify-center items-center lg:flex-row gap-4 sm:gap-8 grow`}>
      <img
        loading={"lazy"}
        src={book.coverImageUrl}
        alt={book.title}
        className="h-full max-h-120 aspect-[8.27/11.69] object-cover rounded-2xl"
      />
      <div
        className={`flex grow flex-col justify-center max-w-fit gap-4 px-4 sm:px-8`}>
        <div className={`w-full text-lg sm:text-2xl font-semibold`}>
          <div className={`pb-4`} title={book.isbn}>
            {book.title}
          </div>
          <div
            className={`text-base lg:max-w-lg`}
            title={`Authors: ${book.authors.join(", ")}`}>
            {book.authors.join(", ")}
          </div>
        </div>
        <div
          title={`Rating: ${book.rating.toPrecision(2)}`}
          className={`flex items-center gap-1`}>
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
        <div
          className={`text-dark/80 w-full text-sm sm:text-base lg:max-w-lg line-clamp-6`}>
          {book.summary}
        </div>
        <div
          className={`flex flex-col justify-center items-center gap-4 sm:gap-6 lg:max-w-lg`}>
          <div className={`flex w-full justify-around gap-4`}>
            <div title={`total copies: ${book.copies}`}>
              Copies: {book.copies}
            </div>
            <div title={`${book.available ? "Available" : "Not Available"}`}>
              Status:{" "}
              <span
                className={`${
                  book.available ? "text-green-500" : "text-red-500"
                } font-medium`}>
                {book.available ? "Available" : "Not Available"}
              </span>
            </div>
            <div title={`page count: ${book.pages || "N/A"}`}>
              Pages: {book.pages || "N/A"}
            </div>
          </div>
          <div title={`Genres`} className={`flex gap-2 flex-wrap lg:max-w-lg`}>
            {book.genres.map(
              (genre: BookGenre): JSX.Element => (
                <Link
                  title={`Genre: ${genre}`}
                  to={`/books/genre/${genre}`}
                  key={genre}
                  className={`text-sm py-0.5 px-2.5 text-white font-medium rounded-full bg-dark/80`}>
                  {genre}
                </Link>
              )
            )}
          </div>
          <Form
            action={"."}
            method={"POST"}
            className={`flex justify-center w-full`}>
            <input
              type={"hidden"}
              name={"book"}
              value={book._id}
              readOnly={true}
            />
            {book.alreadyBorrowed ? (
              <Button type={"submit"} className={`w-2/3 max-w-sm`}>
                Return
              </Button>
            ) : (
              <Button type={"submit"} className={`w-2/3 max-w-sm`}>
                Issue
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default BookByISBNPage;
