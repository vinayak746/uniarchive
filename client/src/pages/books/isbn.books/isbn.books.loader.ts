import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import server from "../../../utils/axios.util";
import { BookInterface } from "../../../types/books.types";
import { ResponseType } from "../../../utils/response.util";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";

const ISBNBookLoader: LoaderFunction = ({
  params,
}: LoaderFunctionArgs): Promise<
  | Response
  | {
      book: BookInterface & {
        available: boolean;
        alreadyBorrowed: boolean | null;
      };
    }
> => {
  return new Promise<
    | Response
    | {
        book: BookInterface & {
          available: boolean;
          alreadyBorrowed: boolean | null;
        };
      }
  >(
    (
      resolve: (
        value:
          | Response
          | {
              book: BookInterface & {
                available: boolean;
                alreadyBorrowed: boolean | null;
              };
            }
      ) => void,
      reject: (reason?: unknown) => void
    ): void => {
      const isbn: string | undefined = params.isbn;
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
              book: BookInterface & {
                available: boolean;
              };
            }>
          >): void => {
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              return;
            }
            resolve({
              book: data.data?.book as BookInterface & {
                available: boolean;
                alreadyBorrowed: boolean | null;
              },
            });
          }
        )
        .catch((): void => {
          toast.error("Error loading book");
        });
    }
  );
};

export default ISBNBookLoader;
