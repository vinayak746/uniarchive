import { JSX } from "react";
import { Link, RouteObject } from "react-router-dom";

interface PagesProps {
  routes: RouteObject[];
  level?: number;
  parentPath?: string;
}

function RoutesView({
  parentPath = "/",
  routes,
  level = 0,
}: PagesProps): JSX.Element {
  parentPath = parentPath === "/" ? "" : parentPath;

  return (
    <div
      className={`flex grow flex-col gap-10 justify-center items-center ${
        !level && "px-10 sm:px-16 py-16"
      }`}>
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
      <div className={`flex justify-center items-center ${level && "w-full"}`}>
        <div className={`border-l flex flex-col grow`}>
          {routes.map((route: RouteObject): JSX.Element => {
            if (!route.path) return <></>;
            return (
              <div
                key={route.path}
                className={`pl-4 py-2  w-full border-dark/50 justify-between flex flex-col ${
                  level % 2 ? "hover:bg-primary" : "hover:bg-secondary"
                }`}>
                <Link
                  className={`flex grow justify-between items-center gap-4`}
                  to={
                    level
                      ? `${parentPath}/${route.path === "/" ? "" : route.path}`
                      : route.path
                  }>
                  <div className={`w-full min-w-max`}>
                    {route.path}
                    {route.id && ` ~ ${route.id}`}
                  </div>
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
                    parentPath={`${parentPath}${
                      !route.path.startsWith("/") ? "/" : ""
                    }${route.path}`}
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
