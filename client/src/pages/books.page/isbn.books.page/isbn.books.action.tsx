import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import server from "../../../utils/axios.util";
import { AxiosResponse } from "axios";
import { ResponseType } from "../../../utils/response.util";
import { toast } from "react-toastify";

const issueBookAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  console.log("first");
  return new Promise(
    (
      resolve: (value: Response | void) => void,
      reject: (reason?: unknown) => void
    ): void => {
      request
        .formData()
        .then((data: FormData): void => {
          const book: FormDataEntryValue | null = data.get("book");
          server
            .post("/api/book/issue", {
              book,
            })
            .then(
              ({
                data,
              }: AxiosResponse<
                ResponseType<{
                  issued: boolean;
                }>
              >): void => {
                if (!data.success) {
                  data.errors.forEach((error: string): void => {
                    toast.error(error);
                  });
                  resolve();
                  return;
                }
                if (data.data?.issued) {
                  toast.success("Book issued successfully");
                } else {
                  toast.success("Book returned successfully");
                }
                resolve();
              }
            )
            .catch((error: unknown): void => {
              reject(error);
            });
        })
        .catch((error: unknown): void => {
          reject(error);
        });
    }
  );
};

export default issueBookAction;
