import { toast } from "react-toastify";
import server from "../../utils/axios.util";
import { type LoaderFunction, redirect } from "react-router-dom";

const LogoutLoader: LoaderFunction = (): Promise<Response> => {
  return new Promise<Response>((resolve: (value: Response) => void): void => {
    server
      .post("/api/user/auth/logout")
      .then((): void => {
        toast.success("Logged out Successfully");
        resolve(redirect("/"));
      })
      .catch(console.error);
  });
};

export default LogoutLoader;
