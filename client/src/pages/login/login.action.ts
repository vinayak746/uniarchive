import { ActionFunction, ActionFunctionArgs } from "react-router-dom";

export interface LoginData {
  uid: string;
  password: string;
}

const LoginAction: ActionFunction = ({
  request,
  context,
}: ActionFunctionArgs): Promise<void> => {
  console.log(context);
  return new Promise(
    (
      resolve: (value: void) => void
      //   reject: (reason?: unknown) => void
    ): void => {
      request.formData().then((formData: FormData): void => {
        const data: LoginData = {
          uid: formData.get("uid") as string,
          password: formData.get("password") as string,
        };
        console.log(data);
        resolve();
      });
    }
  );
};
export default LoginAction;
