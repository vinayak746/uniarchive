import { type JSX } from "react";
import { BookInterface } from "../types/books.types";
import { Star } from "lucide-react";
import { Link, LinkProps } from "react-router-dom";

interface BookCardProps extends Omit<LinkProps, "to"> {
  size?: "sm" | "md" | "lg" | "custom";
  book: BookInterface;
}

function BookCard({
  size = "sm",
  book,
  className,
  ...rest
}: BookCardProps): JSX.Element {
  return (
    <Link
      to={`/books/isbn/${book.isbn}`}
      {...rest}
      title={book.summary}
      className={`w-32 ${
        size == "sm"
          ? "sm:w-40"
          : size === "md"
          ? "sm:w-48"
          : size === "lg" && "sm:w-64"
      } flex flex-col justify-between object-cover rounded-lg ${className}`}>
      <div className={`flex flex-col gap-2`}>
        <img
          loading={"lazy"}
          src={book.coverImageUrl}
          alt={book.title}
          className="w-full aspect-[3/4] object-cover rounded-lg"
        />
        <div className={`w-full`}>
          <div
            className={`w-full overflow-hidden text-nowrap text-ellipsis font-semibold text-dark/80 ${
              size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-2xl"
            } ${size === "lg" && "line-clamp-2"}
              
              }`}
            title={book.title}>
            {book.title}
          </div>
          <div className={`text-xs text-dark/80`}>
            {/* show atmost two authors */}
            {book.authors.slice(0, 2).join(", ")}
            {book.authors.length > 2 && " et al."}
          </div>
        </div>
      </div>
      <div title={`${book.rating} rating`} className={`flex gap-1`}>
        {Array(5)
          .fill(0)
          .map(
            (_: number, i: number): JSX.Element => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.round(book.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            )
          )}
      </div>
    </Link>
  );
}

export default BookCard;
