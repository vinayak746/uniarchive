import { LoaderFunction } from "react-router-dom";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { BookInterface } from "../../types/books.types";
import server from "../../utils/axios.util";
import { ResponseType } from "../../utils/response.util";

const bookCategoryLoader: LoaderFunction = (): Promise<
  | Response
  | {
      books: BookInterface[];
    }
  | void
> => {
  return new Promise<
    | Response
    | {
        books: BookInterface[];
      }
    | void
  >(
    (
      resolve: (
        value:
          | Response
          | {
              books: BookInterface[];
            }
          | void
      ) => void,
      reject: (reason?: unknown) => void
    ): void => {
      server
        .post("api/book/title")
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
              reject();
              return;
            }
            resolve({ books: data.data?.books as BookInterface[] });
          }
        )
        .catch(reject);
    }
  );
};
export default bookCategoryLoader;
