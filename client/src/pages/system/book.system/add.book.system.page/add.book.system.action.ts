import { toast } from "react-toastify";
import { type AxiosResponse } from "axios";
import server from "../../../../utils/axios.util";
import { type ResponseType } from "../../../../utils/response.util";
import { type ActionFunction, type ActionFunctionArgs } from "react-router-dom";

const addBookAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<Response | void> => {
  return new Promise((resolve: (value: void | Response) => void): void => {
    request.formData().then((formData: FormData): void => {
      const isbn = formData.get("isbn") as string;
      console.table({ isbn });
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
