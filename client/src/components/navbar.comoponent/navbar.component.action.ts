import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { BookInterface } from "../../types/books.types";
import server from "../../utils/axios.util";
import { AxiosResponse } from "axios";
import { ResponseType } from "../../utils/response.util";
import { toast } from "react-toastify";

const bookSearchAction: ActionFunction = ({
  request,
}: ActionFunctionArgs): Promise<
  Response | { books: BookInterface[] | null }
> => {
  return new Promise(
    (
      resolve: (
        value:
          | Response
          | {
              books: BookInterface[] | null;
            }
      ) => void,
      reject: (reason?: unknown) => void
    ): void => {
      request.formData().then((formData: FormData): void => {
        const title: FormDataEntryValue | null = formData.get("title");
        if (!title) {
          return resolve({
            books: null,
          });
        }
        server
          .post("/api/book/title", {
            filter: { title },
          })
          .then(
            ({
              data,
            }: AxiosResponse<
              ResponseType<{
                books: BookInterface[];
              }>
            >): void => {
              if (!data.success) {
                data.errors.forEach((error: string): void => {
                  toast.error(error);
                });
                return reject();
              }
              resolve({
                books: data.data?.books || [],
              });
            }
          );
      });
    }
  );
};

export default bookSearchAction;
