import { type JSX } from "react";
import Home from "./pages/home/home";
import Layout from "./pages/layout/layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    element: <Layout />,
  },
]);

function App(): JSX.Element {
  return (
    <div
      className={`w-full min-h-screen bg-primary text-dark font-montserra-text`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
