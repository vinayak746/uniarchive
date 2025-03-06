import { toast } from "react-toastify";
import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { type ResponseType } from "../../utils/response.util";
import { type ActionFunction, type ActionFunctionArgs } from "react-router-dom";

export interface LoginData {
  uid: string;
  password: string;
}

const LoginAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  return new Promise<Response | void>(
    (resolve: (value: Response | void) => void): void => {
      request.formData().then((formData: FormData): void => {
        const { uid, password }: LoginData = {
          uid: formData.get("uid") as string,
          password: formData.get("password") as string,
        };
        server
          .post("/api/user/auth/login", {
            uid,
            password,
          })
          .then((res: AxiosResponse<ResponseType>): void => {
            const data: ResponseType = res.data;
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              resolve();
              return;
            }
            toast.success("Logged in Successfully");
            resolve();
            return;
          })
          .catch((err: Error): void => {
            console.error(err);
            toast.error("Failed to Login");
            resolve();
          });
      });
    }
  );
};
export default LoginAction;
