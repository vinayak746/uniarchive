import { AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { redirect, type LoaderFunction } from "react-router-dom";

const CheckInOutLoader: LoaderFunction = (): Promise<Response | void> => {
  return new Promise(
    (
      resolve: (value: Response | void) => void
      // reject: (reason?: Error) => void
    ): void => {
      server.post("/api/user/refresh").then(({ data }: AxiosResponse) => {
        if (!data.success) {
          resolve(redirect("/login"));
          return;
        }
        resolve();
      });
    }
  );
};

export default CheckInOutLoader;
