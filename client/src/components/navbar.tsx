import {
  Castle,
  Earth,
  Heart,
  Search,
  UserRound,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { JSX } from "react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom";

function Navbar(): JSX.Element {
  return (
    <div
      className={`flex bg-primary sticky top-0 flex-col p-4 sm:p-8 gap-4 sm:gap-8`}>
      <nav className={`flex justify-between items-center gap-8`}>
        <Link to={`/`} className={`text-2xl font-bold uppercase`}>
          UniArchive
        </Link>
        <label
          className={`px-4 py-2 hidden sm:flex gap-2 grow max-w-md outline-none border border-dark/50 bg-white rounded-xl items-center`}
          htmlFor="search">
          <button>
            <Search size={20} />
          </button>
          <input
            className={`grow outline-none`}
            type="text"
            id="search"
            placeholder={`Search name of the book or author...`}
          />
        </label>
        <div className={`flex justify-center items-center gap-2`}>
          <div
            className={`flex justify-center items-center p-2 bg-secondary border border-dark/50 rounded-full`}>
            <UserRound size={24} />
          </div>
          Yash
        </div>
      </nav>
      <nav className={``}>
        <ul className={`flex justify-center gap-2 flex-wrap`}>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `px-4 py-2 rounded-lg flex justify-center items-center gap-2 duration-100 ${
                  isActive && "bg-tertiary font-medium text-white"
                }`
              }
              end
              to="/category">
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
              to="/category/fantasy">
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
              to="/category/drama">
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
              to="/category/detective">
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
              to="/category/education">
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
              to="/category/psychology">
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
              to="/category/business">
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
