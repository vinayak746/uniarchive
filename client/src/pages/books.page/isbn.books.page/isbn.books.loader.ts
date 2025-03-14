import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { BookInterface } from "../../../types/books.types";
import server from "../../../utils/axios.util";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { ResponseType } from "../../../utils/response.util";

const ISBNBookLoader: LoaderFunction = ({
  params,
}: LoaderFunctionArgs): Promise<
  | Response
  | {
      book: BookInterface;
    }
> => {
  return new Promise<
    | Response
    | {
        book: BookInterface;
      }
  >(
    (
      resolve: (
        value:
          | Response
          | {
              book: BookInterface;
            }
      ) => void,
      reject: (reason?: unknown) => void
    ): void => {
      const isbn: string | undefined = params.isbn;
      console.log({ isbn });
      if (!isbn) {
        reject("ISBN is required");
        return;
      }
      server
        .post(`/api/book/isbn/`, { filter: { isbn } })
        .then(
          ({
            data,
          }: AxiosResponse<
            ResponseType<{
              book: BookInterface;
            }>
          >): void => {
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              return;
            }
            console.log({
              book: data.data?.book as BookInterface,
            });
            resolve({ book: data.data?.book as BookInterface });
          }
        )
        .catch((): void => {
          toast.error("Error loading book");
        });
    }
  );
};

export default ISBNBookLoader;
