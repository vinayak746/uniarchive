import HomePage from "./pages/home.page/home.page";
import { type RouteObject } from "react-router-dom";
import LoginPage from "./pages/login.page/login.page";
import Layout from "./components/layout.component/layout";
import LoginAction from "./pages/login.page/login.action";
import LoginLoader from "./pages/login.page/login.loader";
import LogoutAction from "./pages/logout.page/logout.loader";
import RegisterPage from "./pages/register.page/register.page";
import NotFoundPage from "./pages/notfound.page/notfound.page";
import SystemLayout from "./pages/system.page/index.system.page";
import LoadingSpinner from "./components/loadingspinner.component";
import RoutesView from "./pages/routes_view.page/routes_view.page";
import RegisterAction from "./pages/register.page/register.action";
import RegisterLoader from "./pages/register.page/register.loader";
import BookCategoryPage from "./pages/books.page/index.books.page";
import bookCategoryLoader from "./pages/books.page/index.books.loader";
import CheckInOutPage from "./pages/checkin_out.page/checkin_out.page";
import RootLayoutLoader from "./components/layout.component/layout.loader";
import CheckInOutLoader from "./pages/checkin_out.page/checkin_out.loader";
import BookByISBNPage from "./pages/books.page/isbn.books.page/isbn.books.page";
import ISBNBookLoader from "./pages/books.page/isbn.books.page/isbn.books.loader";
import issueBookAction from "./pages/books.page/isbn.books.page/isbn.books.action";
import bookSearchAction from "./components/navbar.comoponent/navbar.component.action";
import BookSystemPage from "./pages/system.page/book.system.page/index.book.system.page";
import bookSystemLoader from "./pages/system.page/book.system.page/index.book.system.loader";
import CheckInOutSystemPage from "./pages/system.page/checkinout.system.page/checkinout.system.page";
import AddBookPage from "./pages/system.page/book.system.page/add.book.system.page/add.book.system.page";
import addBookAction from "./pages/system.page/book.system.page/add.book.system.page/add.book.system.action";

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
            loader: bookSystemLoader,
            element: <BookSystemPage />,
          },
          {
            action: addBookAction,
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
        index: true,
        element: <HomePage />,
      },
      {
        path: "booksearch",
        action: bookSearchAction,
      },
      {
        loader: CheckInOutLoader,
        path: "checkin-out",
        element: <CheckInOutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "books",
        id: "all-books",
        children: [
          {
            element: <BookCategoryPage />,
            index: true,
          },
          {
            path: "genre/:genre",
            element: <BookCategoryPage />,
          },
          {
            loader: ISBNBookLoader,
            path: "isbn/:isbn",
            element: <BookByISBNPage />,
            action: issueBookAction,
          },
        ],
        loader: bookCategoryLoader,
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
