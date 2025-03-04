import { LoaderFunction, redirect } from "react-router-dom";
import server from "../../utils/axios.util";
import { toast } from "react-toastify";

const LogoutLoader: LoaderFunction = (): Promise<Response> => {
  return new Promise<Response>((resolve: (value: Response) => void): void => {
    server
      .post("/api/user/logout")
      .then((): void => {
        toast.success("Logged out Successfully");
        resolve(redirect("/"));
      })
      .catch(console.error);
  });
};

export default LogoutLoader;
