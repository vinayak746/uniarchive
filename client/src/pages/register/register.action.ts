import { AxiosResponse } from "axios";
import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { ResponseType } from "../../utils/response.util";
import { toast } from "react-toastify";
import server from "../../utils/axios.util";

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
  return new Promise(
    (
      resolve: (value: Response | void) => void,
      reject: (reason?: unknown) => void
    ): void => {
      request.formData().then((formData: FormData): void => {
        const data: RegisterData = {
          name: formData.get("name") as string,
          uid: formData.get("uid") as string,
          password: formData.get("password") as string,
          role: formData.get("role") as UserRoles,
        };
        server
          .post(`/api/user/register`, data)
          .then((res: AxiosResponse<ResponseType>): void => {
            const data: ResponseType = res.data;
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              reject();
              return;
            }
            toast.success("Registered Successfully");
            resolve();
            return;
          })
          .catch((error: unknown): void => {
            console.error(error);
            reject(error);
          });

        resolve();
      });
    }
  );
};
export default RegisterAction;
