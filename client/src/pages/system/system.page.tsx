import { type JSX } from "react";
import Navbar from "../../components/navbar";
import { UserCog } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function SystemLayout(): JSX.Element {
  return (
    <>
      <Navbar onlyMain />
      <div className={`flex gap-4 sm:gap-8 grow p-4 sm:p-8`}>
        <div title={`system user`}>
          <UserCog />
        </div>
        <div
          className={`flex flex-col grow bg-secondary rounded-4xl p-4 sm:p-8`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
