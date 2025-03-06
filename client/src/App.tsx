import { type JSX } from "react";
import Layout from "./pages/layout/layout";
import HomePage from "./pages/home/home.page";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/login/login.page";
import NotFoundPage from "./pages/notfound.page";
import LoginAction from "./pages/login/login.action";
import LoginLoader from "./pages/login/login.loader";
import SystemLayout from "./pages/system/system.page";
import LogoutLoader from "./pages/logout/logout.loader";
import LoadingSpinner from "./components/loadingspinner";
import RegisterPage from "./pages/register/register.page";
import RootLayoutLoader from "./pages/layout/layout.loader";
import RegisterAction from "./pages/register/register.action";
import RegisterLoader from "./pages/register/register.loader";
import CheckInOutPage from "./pages/checkin_out/checkin_out.page";
import CheckInOutLoader from "./pages/checkin_out/checkin_out.loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckInOutSystemPage from "./pages/system/checkinout.system/checkinout.system.page";
import checkInOutSystemLoader from "./pages/system/checkinout.system/checkinout.system.loader";

const router = createBrowserRouter([
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
    loader: LogoutLoader,
    hydrateFallbackElement: <LoadingSpinner />,
    path: "/logout",
  },
  {
    path: "/system",
    id: "system",
    element: <SystemLayout />,
    children: [
      {
        path: "checkinout",
        loader: checkInOutSystemLoader,
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
