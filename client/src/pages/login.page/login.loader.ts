import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { type ResponseType } from "../../utils/response.util";
import { redirect, type LoaderFunction } from "react-router-dom";

const LoginLoader: LoaderFunction = (): Promise<Response | void> => {
  return new Promise<Response | void>(
    (resolve: (value: Response | void) => void): void => {
      server.post("/api/user/auth/refresh").then(
        ({
          data,
        }: AxiosResponse<
          ResponseType<{
            _id: string;
          }>
        >): void => {
          if (data.success) {
            resolve(redirect("/"));
            return;
          }
          resolve();
        }
      );
    }
  );
};

export default LoginLoader;
