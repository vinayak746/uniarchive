import Layout from "./pages/layout/layout";
import HomePage from "./pages/home/home.page";
import { RouteObject } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import NotFoundPage from "./pages/notfound.page";
import LoginAction from "./pages/login/login.action";
import LoginLoader from "./pages/login/login.loader";
import SystemLayout from "./pages/system/system.page";
import LogoutAction from "./pages/logout/logout.loader";
import LoadingSpinner from "./components/loadingspinner";
import RegisterPage from "./pages/register/register.page";
import RootLayoutLoader from "./pages/layout/layout.loader";
import RegisterAction from "./pages/register/register.action";
import RegisterLoader from "./pages/register/register.loader";
import CheckInOutPage from "./pages/checkin_out/checkin_out.page";
import CheckInOutLoader from "./pages/checkin_out/checkin_out.loader";
import CheckInOutSystemPage from "./pages/system/checkinout.system/checkinout.system.page";
import RoutesView from "./pages/routes_view/routes_view.page";

let routes: RouteObject[] = [];
routes = [
  {
    action: LoginAction,
    loader: LoginLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/login",
    element: <LoginPage />,
  },
  {
    loader: RegisterLoader,
    action: RegisterAction,
    path: "/register",
    element: <RegisterPage />,
  },
  {
    action: LogoutAction,
    path: "/logout",
  },
  {
    path: "/system",
    element: <SystemLayout />,
    children: [
      {
        path: "checkin-out",
        element: <CheckInOutSystemPage />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        loader: CheckInOutLoader,
        path: "/checkin-out",
        element: <CheckInOutPage />,
      },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
    id: "layout",
    loader: RootLayoutLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    element: <Layout />,
  },
];

routes.push({
  path: "/routes",
  element: <RoutesView routes={routes} />,
});

export default routes;
