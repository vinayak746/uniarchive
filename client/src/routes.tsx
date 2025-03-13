import { RouteObject } from "react-router-dom";
import Layout from "./components/layout.component/layout";
import HomePage from "./pages/home.page/home.page";
import LoginPage from "./pages/login.page/login.page";
import SystemLayout from "./pages/system.page/system.page";
import LogoutAction from "./pages/logout.page/logout.loader";
import LoadingSpinner from "./components/loadingspinner.component";
import LoginAction from "./pages/login.page/login.action";
import LoginLoader from "./pages/login.page/login.loader";
import RegisterPage from "./pages/register.page/register.page";
import NotFoundPage from "./pages/notfound.page/notfound.page";
import RoutesView from "./pages/routes_view.page/routes_view.page";
import RegisterAction from "./pages/register.page/register.action";
import RegisterLoader from "./pages/register.page/register.loader";
import RootLayoutLoader from "./components/layout.component/layout.loader";
import CheckInOutPage from "./pages/checkin_out.page/checkin_out.page";
import CheckInOutLoader from "./pages/checkin_out.page/checkin_out.loader";
import CheckInOutSystemPage from "./pages/system.page/checkinout.system.page/checkinout.system.page";
import AddBookPage from "./pages/system.page/book.system.page/add.book.system.page/add.book.system.page";
import BookSystemPage from "./pages/system.page/book.system.page/book.system.page";

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
      {
        path: "book",
        children: [
          {
            index: true,
            element: <BookSystemPage />,
          },
          {
            path: "add",
            element: <AddBookPage />,
          },
        ],
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
