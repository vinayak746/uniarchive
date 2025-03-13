import { JSX } from "react";
import { Link, RouteObject } from "react-router-dom";

interface PagesProps {
  routes: RouteObject[];
  level?: number;
  parentPath?: string;
}

function RoutesView({
  parentPath = "",
  routes,
  level = 0,
}: PagesProps): JSX.Element {
  parentPath = parentPath === "/" ? "" : parentPath;
  return (
    <div className={`flex grow flex-col gap-2 justify-center items-centerm`}>
      {!level && (
        <>
          <div className={`flex justify-center items-center gap-4`}>
            <h1 className={`text-2xl`}>Pages</h1>
          </div>
          <div className={`flex justify-end items-center px-8 sm:px-16 gap-4`}>
            <div className={`flex gap-2`}>
              <div
                className={`h-6 aspect-square bg-blue-400 w-fit border border-dark`}
              />
              Loader
            </div>
            <div className={`flex gap-2`}>
              <div
                className={`h-6 aspect-square bg-purple-400 w-fit border border-dark`}
              />
              Action
            </div>
          </div>
        </>
      )}
      <div className={`flex flex-col justify-center items-center`}>
        <div className={`border-l flex flex-col`}>
          {routes.map((route: RouteObject): JSX.Element => {
            route.path = route.path || "/";
            return (
              <div
                className={`${level ? "pl-4" : "px-4"} py-2 border-dark/50 ${
                  level % 2 ? "hover:bg-primary" : "hover:bg-secondary"
                }`}>
                <Link
                  className={`flex justify-between items-center gap-4`}
                  to={
                    parentPath === ""
                      ? route.path
                      : parentPath + "/" + route.path
                  }>
                  {route.path}
                  {route.id && ` ~ ${route.id}`}
                  <div className={`flex justify-center items-center`}>
                    {
                      <div
                        title={`Loader: ${route.loader}`}
                        className={`h-4 border-y border-dark/50 aspect-square ${
                          route.loader && "bg-blue-400"
                        }`}
                      />
                    }
                    <div className={`h-2 border-l border-dark/50`} />
                    {
                      <div
                        title={`Action: ${route.action}`}
                        className={`h-4 border-y border-dark/50 aspect-square ${
                          route.action && "bg-purple-400"
                        }`}
                      />
                    }
                  </div>
                </Link>
                {route.children?.length && (
                  <RoutesView
                    parentPath={route.path}
                    level={level + 1}
                    routes={route.children}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoutesView;
