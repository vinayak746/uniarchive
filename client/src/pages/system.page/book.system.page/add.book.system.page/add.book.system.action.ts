import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { ResponseType } from "../../../../utils/response.util";
import server from "../../../../utils/axios.util";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const addBookAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  return new Promise((resolve: (value: void | Response) => void): void => {
    request.formData().then((formData: FormData): void => {
      const isbn = formData.get("isbn") as string;
      server
        .post("/api/book/add", {
          isbn,
        })
        .then(
          ({
            data,
          }: AxiosResponse<
            ResponseType<{
              title: string;
            }>
          >): void => {
            if (data.success) {
              const { title } = data.data as { title: string };
              toast.success(`Successfully added book: ${title}`);
            } else {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
            }
            resolve();
          }
        )
        .catch((): void => {
          toast.error("Failed to add book");
          resolve();
        });
    });
  });
};

export default addBookAction;
