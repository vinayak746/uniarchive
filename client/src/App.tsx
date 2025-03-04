import { type JSX } from "react";
import HomePage from "./pages/home/home.page";
import NotFoundPage from "./pages/notfound.page";
import Layout from "./pages/layout/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/login.page";
import LoginAction from "./pages/login/login.action";
import CheckInOutPage from "./pages/checkin_out/checkin_out.page";
import CheckInOutLoader from "./pages/checkin_out/checkin_out.loader";
import RegisterPage from "./pages/register/register.page";
import RegisterAction from "./pages/register/register.action";
import { ToastContainer } from "react-toastify";
import LogoutLoader from "./pages/logout/logout.loader";
import LoginLoader from "./pages/login/login.loader";
import RootLayoutLoader from "./pages/layout/layout.loader";
import LoadingSpinner from "./components/loadingspinner";

const router = createBrowserRouter([
  {
    action: LoginAction,
    loader: LoginLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/login",
    element: <LoginPage />,
  },
  {
    action: RegisterAction,
    path: "/register",
    element: <RegisterPage />,
  },
  {
    loader: LogoutLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/logout",
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
]);

function App(): JSX.Element {
  return (
    <div
      className={`flex flex-col w-full min-h-screen bg-primary text-dark font-montserrat-text`}>
      <RouterProvider router={router} />
      <ToastContainer theme={"light"} position={"bottom-right"} />
    </div>
  );
}

export default App;
