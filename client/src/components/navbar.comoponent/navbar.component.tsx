import {
  type JSX,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
} from "react";
import {
  LogIn,
  BookX,
  Earth,
  Heart,
  Castle,
  Search,
  BookOpen,
  UserRound,
  DollarSign,
} from "lucide-react";
import {
  Link,
  NavLink,
  useFetcher,
  useRouteLoaderData,
  type NavLinkRenderProps,
} from "react-router-dom";
import RootLayoutLoader, {
  SessionData,
} from "../layout.component/layout.loader";
import { type BookInterface } from "../../types/books.types";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  onlyMain?: boolean;
}

function Navbar({
  onlyMain = false,
  className,
  ...rest
}: NavbarProps): JSX.Element {
  const session = useRouteLoaderData<typeof RootLayoutLoader>(
    "layout"
  ) as SessionData;

  const [titleFilter, setTitleFilter] = useState<string>("");

  const bookFetcher = useFetcher<{
    books: BookInterface[] | null;
  }>();

  return (
    <div
      {...rest}
      className={`flex bg-primary sticky top-0 flex-col p-4 sm:p-8 gap-4 sm:gap-8 z-20 ${className}`}>
      <nav className={`flex justify-between items-center gap-8`}>
        <Link to={`/`} className={`text-2xl font-bold uppercase`}>
          UniArchive
        </Link>
        {!onlyMain && (
          <>
            <div className={`relative flex flex-col  gap-2`}>
              <bookFetcher.Form action={`/booksearch`} method={`POST`}>
                <label
                  className={`px-4 py-2 group hidden sm:flex gap-2 grow max-w-md outline-none border border-dark/50 bg-white rounded-xl items-center`}
                  htmlFor="search">
                  <button type={`submit`}>
                    <Search size={20} />
                  </button>
                  <input
                    name={"title"}
                    type="search"
                    value={titleFilter}
                    className={`grow outline-none cursor-default`}
                    placeholder={`Search name of the book or author...`}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                      setTitleFilter(e.target.value);
                      bookFetcher.submit(
                        new FormData(e.target.form || undefined),
                        {
                          method: "POST",
                          action: "booksearch",
                          encType: "multipart/form-data",
                        }
                      );
                    }}
                  />
                  {bookFetcher.data?.books ? (
                    <div
                      className={`absolute snap-y max-h-54 overflow-auto scrollbar hidden group-focus-within:flex flex-col gap-1 w-full top-12 left-0 bg-white rounded-xl border border-dark/50 shadow-lg p-2`}>
                      <div
                        className={`${
                          !bookFetcher.data.books.length && "hidden"
                        } sticky snap-start -top-2 left-0 bg-white p-2`}>
                        {bookFetcher.data?.books.length} books found
                      </div>
                      {bookFetcher.data?.books.length !== 0 ? (
                        <>
                          {bookFetcher.data?.books.map(
                            (book: BookInterface): JSX.Element => (
                              <Link
                                key={book.isbn}
                                to={`/books/isbn/${book.isbn}`}
                                className={`px-2 py-1 snap-start min-h-fit text-sm w-full hover:bg-primary rounded-md overflow-hidden text-ellipsis`}>
                                <div className={`flex gap-2`}>
                                  <img
                                    className={`w-10 h-10 rounded-sm`}
                                    src={book.coverImageUrl}
                                    alt={`${book.title}'s cover`}
                                  />
                                  <div>{book.title}</div>
                                </div>
                              </Link>
                            )
                          )}
                        </>
                      ) : (
                        <div className={`p-2 flex gap-2 justify-between`}>
                          No book found
                          <BookX className={`text-dark/80`} size={20} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </label>
              </bookFetcher.Form>
            </div>
            {session.loggedIn ? (
              <div className={`flex justify-center items-center gap-2`}>
                <div
                  className={`flex justify-center items-center p-2 bg-secondary border border-dark/50 rounded-full`}>
                  <UserRound size={24} />
                </div>
                {session.user.name}
              </div>
            ) : (
              <Link
                to={`/login`}
                className={`flex gap-2 justify-center items-center px-4 py-2 bg-tertiary text-white font-medium rounded-lg`}>
                Login <LogIn size={16} />
              </Link>
            )}
          </>
        )}
      </nav>
      <nav className={`${onlyMain && "hidden"}`}>
        <ul className={`flex justify-center gap-2 flex-wrap`}>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              end
              to="/books">
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/fantasy">
              <Castle size={16} />
              Fantasy
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/drama">
              <Heart size={16} />
              Drama
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/detective">
              <Search size={16} />
              Detective
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/education">
              <BookOpen size={16} />
              Education
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/psychology">
              <Earth size={16} />
              Psychology
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              to="/books/genre/business">
              <DollarSign size={16} />
              Business
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
