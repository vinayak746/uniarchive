import { type JSX } from "react";
import Navbar from "../navbar.component";
import Sidebar from "../sidebar.component";
import { Outlet } from "react-router-dom";

function Layout(): JSX.Element {
  return (
    <div className={`w-full h-screen flex flex-col`}>
      <Navbar />
      <div className="flex flex-col sm:flex-row grow min-h-0 px-4 pb-4 gap-4 sm:px-8 sm:gap-8">
        <Sidebar />
        <main className="flex flex-col grow overflow-auto min-h-0 bg-secondary p-6 rounded-[2rem] scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
