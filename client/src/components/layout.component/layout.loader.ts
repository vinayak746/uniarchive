import { toast } from "react-toastify";
import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { type LoaderFunction } from "react-router-dom";
import { type ResponseType } from "../../utils/response.util";

export type LoggedInUserData = {
  uid: string;
  name: string;
  role: string;
};

export type SessionData =
  | {
      loggedIn: false;
    }
  | {
      loggedIn: true;
      user: LoggedInUserData;
    };

const RootLayoutLoader: LoaderFunction = (): Promise<SessionData> => {
  return new Promise<SessionData>(
    (
      resolve: (value: SessionData | PromiseLike<SessionData>) => void
    ): void => {
      server
        .post("/api/user/auth/refresh")
        .then(({ data }: AxiosResponse<ResponseType<SessionData>>): void => {
          if (data.success) {
            //   toast.success("Session Refreshed");
            if (!data.data) {
              resolve({
                loggedIn: false,
              });
              return;
            }
            const { uid, name, role } =
              data.data as unknown as LoggedInUserData;
            resolve({
              loggedIn: true,
              user: {
                uid,
                name,
                role,
              },
            });
          } else {
            data.errors.forEach((error: string): void => {
              toast.error(error);
            });
            resolve({
              loggedIn: false,
            });
          }
        })
        .catch((error: Error): void => {
          console.error(error);
          toast.error("Failed to Refresh Session");
          resolve({
            loggedIn: false,
          });
        });
    }
  );
};

export default RootLayoutLoader;
