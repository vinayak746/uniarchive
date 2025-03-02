import { type JSX } from "react";
import Home from "./pages/home/home";
import NotFound from "./pages/notfound";
import Layout from "./pages/layout/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import LoginAction from "./pages/login/login.action";

const router = createBrowserRouter([
  {
    action: LoginAction,
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
    element: <Layout />,
  },
]);

function App(): JSX.Element {
  return (
    <div
      className={`flex flex-col w-full min-h-screen bg-primary text-dark font-montserrat-text`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
