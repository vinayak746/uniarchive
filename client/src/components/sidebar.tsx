import {
  Star,
  Home,
  LogOut,
  Settings,
  SidebarOpen,
  SidebarClose,
  BookmarkCheck,
} from "lucide-react";
import { type JSX, useState } from "react";
import { Link, NavLink, type NavLinkRenderProps } from "react-router-dom";

function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={`flex flex-col justify-between pb-2 gap-4`}>
      <div className={`flex flex-col gap-4`}>
        <button
          className={`rounded-full borde border-dark/50 w-fit p-2 bg-secondary outline-none cursor-pointer`}
          onClick={(): void => setIsOpen((pIs: boolean): boolean => !pIs)}>
          {isOpen ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
        </button>

        <ul className={`flex flex-col gap-4 ${isOpen ? "flex" : "hidden"}`}>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/`}>
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/highlights`}>
              <Star size={18} />
              Highlights
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/saved`}>
              <BookmarkCheck size={18} />
              Saved
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: NavLinkRenderProps): string =>
                `flex items-center gap-2 px-3 rounded-lg py-2 ${
                  isActive && "bg-secondary font-medium"
                }`
              }
              to={`/settings`}>
              <Settings size={18} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      <Link
        className={`flex items-center gap-2 px-3 rounded-lg py-2 ${
          isOpen || "hidden"
        }`}
        to={`/logout`}>
        <LogOut size={18} />
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;
