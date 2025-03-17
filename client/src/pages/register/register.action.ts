import {
  type ActionFunction,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import { type ResponseType } from "../../utils/response.util";

export enum UserRoles {
  UGSTUDENT = "UGSTUDENT",
  PGSTUDENT = "PGSTUDENT",
  RESEARCHSCHOLAR = "RESEARCHSCHOLAR",
  FACULTY = "FACULTY",
  NONACADEMICSTAFF = "NONACADEMICSTAFF",
  ALUMNI = "ALUMNI",
  VISITINGFACULTY = "VISITINGFACULTY",
}

export interface RegisterData {
  name: string;
  uid: string;
  password: string;
  role: UserRoles;
}

const RegisterAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  return new Promise<Response | void>(
    (resolve: (value: Response | void) => void): void => {
      request.formData().then((formData: FormData): void => {
        const data: RegisterData = {
          name: formData.get("name") as string,
          uid: formData.get("uid") as string,
          password: formData.get("password") as string,
          role: formData.get("role") as UserRoles,
        };
        server
          .post(`/api/user/auth/register`, data)
          .then((res: AxiosResponse<ResponseType>): void => {
            const data: ResponseType = res.data;
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              resolve();
              return;
            }
            toast.success("Registered Successfully");
            resolve(redirect("/"));
            return;
          })
          .catch((error: unknown): void => {
            console.error(error);
            toast.error("Failed to Register");
            resolve();
          });

        resolve();
      });
    }
  );
};
export default RegisterAction;
