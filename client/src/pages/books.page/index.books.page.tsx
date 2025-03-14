import { JSX } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { BookGenre, BookInterface } from "../../types/books.types";
import bookCategoryLoader from "./index.books.loader";
import BookCard from "../../components/bookcard.component";

function BookCategoryPage(): JSX.Element {
  const { genre: filterParam } = useParams() as { genre?: BookGenre };
  let genre: BookGenre | undefined = filterParam;
  if (genre) {
    genre = (genre[0].toUpperCase() + genre.slice(1)) as BookGenre;
  }
  const {
    books,
  }: {
    books: BookInterface[];
  } = useRouteLoaderData<typeof bookCategoryLoader>("all-books") as {
    books: BookInterface[];
  };
  return (
    <div className={`flex justify-center items-center flex-wrap gap-4`}>
      {books
        .filter(
          (book: BookInterface): boolean =>
            !genre || book.genres.includes(genre)
        )
        .map(
          (book: BookInterface, i: number): JSX.Element => (
            <BookCard key={i} book={book} />
          )
        )}
    </div>
  );
}
export default BookCategoryPage;
