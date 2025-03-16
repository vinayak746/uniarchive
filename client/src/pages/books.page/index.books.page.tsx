import { JSX } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { BookGenre, BookInterface } from "../../types/books.types";
import bookCategoryLoader from "./index.books.loader";
import BookCard from "../../components/bookcard.component";
import { BookX } from "lucide-react";

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
  const filteredBooks: BookInterface[] = books.filter(
    (book: BookInterface): boolean => !genre || book.genres.includes(genre)
  );
  return (
    <div className={`flex grow justify-center items-center flex-wrap gap-4`}>
      {/* show total book count */}
      <div
        className={`w-full text-center flex justify-center items-center gap-4`}>
        {filteredBooks.length} books {genre && <>for genre: {genre}</>}
      </div>
      {filteredBooks.length === 0 && (
        <div
          className={`text-xl sm:text-2xl grow flex flex-col justify-center items-center gap-4`}>
          {<BookX className={`text-dark/80`} size={40} />}
          No books found{" "}
          {genre && (
            <>
              for genre: <div>{genre}</div>
            </>
          )}
        </div>
      )}
      {filteredBooks.map(
        (book: BookInterface): JSX.Element => (
          <BookCard key={book.isbn} book={book} />
        )
      )}
    </div>
  );
}
export default BookCategoryPage;
