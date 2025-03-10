import routes from "./routes";
import { type JSX } from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

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
