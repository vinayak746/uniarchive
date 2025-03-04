import { type ActionFunction, type ActionFunctionArgs } from "react-router-dom";
import server from "../../utils/axios.util";
import { type AxiosResponse } from "axios";
import { type ResponseType } from "../../utils/response.util";
import { toast } from "react-toastify";

export interface LoginData {
  uid: string;
  password: string;
}

const LoginAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  return new Promise<Response | void>(
    (
      resolve: (value: Response | void) => void,
      reject: (reason?: unknown) => void
    ): void => {
      request.formData().then((formData: FormData): void => {
        const { uid, password }: LoginData = {
          uid: formData.get("uid") as string,
          password: formData.get("password") as string,
        };
        server
          .post("/api/user/login", {
            uid,
            password,
          })
          .then((res: AxiosResponse<ResponseType>): void => {
            const data: ResponseType = res.data;
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              reject();
              return;
            }
            toast.success("Logged in Successfully");
            resolve();
            return;
          })
          .catch(reject);
      });
    }
  );
};
export default LoginAction;
