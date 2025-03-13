import { JSX } from "react";
import { useLoaderData } from "react-router-dom";
import bookSystemLoader from "./book.system.loader";
import { BookInterface } from "../../../types/books.types";
import BookCard from "../../../components/bookcard.component";

function BookSystemPage(): JSX.Element {
  const {
    books,
  }: {
    books: BookInterface[];
  } = useLoaderData<typeof bookSystemLoader>() as {
    books: BookInterface[];
  };
  return (
    <div className={`flex flex-wrap gap-4`}>
      {books.map(
        (book: BookInterface, i: number): JSX.Element => (
          <BookCard key={i} book={book} />
        )
      )}
    </div>
  );
}

export default BookSystemPage;
