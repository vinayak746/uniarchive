import { JSX } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { BookGenre, BookInterface } from "../../types/books.types";
import bookCategoryLoader from "./index.category.loader";
import BookCard from "../../components/bookcard.component";

function BookCategoryPage(): JSX.Element {
  const { filter: filterParam } = useParams() as { filter?: BookGenre };
  let filter: BookGenre | undefined = filterParam;
  if (filter) {
    filter = (filter[0].toUpperCase() + filter.slice(1)) as BookGenre;
  }
  const {
    books,
  }: {
    books: BookInterface[];
  } = useLoaderData<typeof bookCategoryLoader>() as {
    books: BookInterface[];
  };
  return (
    <div className={`flex flex-wrap gap-4`}>
      {books
        .filter(
          (book: BookInterface): boolean =>
            !filter || book.genres.includes(filter)
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
