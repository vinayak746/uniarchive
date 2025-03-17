import { type JSX } from "react";
import { Link } from "react-router-dom";
import { DoorOpen } from "lucide-react";
import BookCard from "../../components/bookcard.component.tsx";
import { BookGenre } from "../../types/books.types.ts";

function HomePage(): JSX.Element {
  return (
    <div className={`flex flex-col gap-8 p-8`}>
      <div
        className={`flex flex-col gap-16 justify-center items-center sm:p-16 ma-w-2xl`}>
        <div className={`flex flex-col gap-8 justify-center items-center`}>
          <div className={`text-5xl text-center sm:text-6xl font-bold`}>
            Knowledge Resource Center
            <br />- Library
          </div>
          <div
            className={`text-xl xl:text-3xl sm:text-2xl text-center text-dark/80`}>
            Your gateway to a world of information and inspiration{" "}
          </div>
        </div>
        <Link
          to={`/checkin-out`}
          className={`flex justify-center items-center gap-2`}>
          <button
            className={`px-6 py-3 flex justify-center items-center gap-2 text-xl bg-tertiary rounded-lg w-fit text-white font-medium cursor-pointer`}>
            <span>Check in/out</span>
            <DoorOpen size={24} />
          </button>
        </Link>
      </div>
      <hr className={`my-8 border-t border-dark/50`} />
      <div className={`flex gap-8 flex-wrap justify-around items-end`}>
        <div className={`h-84 flex flex-col gap-12 z-10`}>
          <div className={`flex flex-col gap-4`}>
            <div
              className={`text-4xl sm:text-5xl uppercase font-bold leading-tight`}>
              Recommended
              <br />
              Reads
            </div>
            <div className={`text-lg max-w-xs`}>
              We picked up the most popular books for you.
              <br />
              Check them out!
            </div>
          </div>
          <Link to={`/category`} className={`flex justify-center items-center`}>
            <button
              className={`px-8 py-2 text-lg bg-tertiary rounded-lg w-fit text-white font-semibold cursor-pointer`}>
              Watch full list
            </button>
          </Link>
        </div>
        <BookCard
          book={{
            coverImageUrl:
              "https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg",
            title: "Book Title",
            authors: ["Author 1", "Author 2"],
            rating: 4,
            copies: 5,
            genres: [BookGenre.BUSINESS, BookGenre.DETECTIVE],
            isbn: "1234567890",
            pages: 100,
            summary: "Book Summary",
          }}
          size="lg"
        />{" "}
        <BookCard
          book={{
            coverImageUrl:
              "https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg",
            title: "Book Title",
            authors: ["Author 1", "Author 2"],
            rating: 4,
            copies: 5,
            genres: [BookGenre.BUSINESS, BookGenre.DETECTIVE],
            isbn: "1234567890",
            pages: 100,
            summary: "Book Summary",
          }}
          size="md"
        />{" "}
        <BookCard
          book={{
            coverImageUrl:
              "https://admin.itsnicethat.com/images/XSRykZCRQhGROOBt6Yug8QTbykI=/95588/format-webp%7Cwidth-1440/54e335375c3e3c758b0000f5.jpg",
            title: "Book Title",
            authors: ["Author 1", "Author 2"],
            rating: 4,
            copies: 5,
            genres: [BookGenre.BUSINESS, BookGenre.DETECTIVE],
            isbn: "1234567890",
            pages: 100,
            summary: "Book Summary",
          }}
          size="sm"
        />
      </div>
    </div>
  );
}

export default HomePage;
