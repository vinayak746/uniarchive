import { LoaderFunction } from "react-router-dom";
import server from "../../../utils/axios.util";
import { ResponseType } from "../../../utils/response.util";
import { BookInterface } from "../../../types/books.types";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const bookSystemLoader: LoaderFunction = () => {
  return new Promise(
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
export default bookSystemLoader;
