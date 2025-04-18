import { AxiosError, AxiosResponse } from "axios";
import { BookInterface } from "../../types/books.types";
import { ResponseType } from "../../utils/response.util";
import { toast } from "react-toastify";
import server from "../../utils/axios.util";

export default function homeLoader(): Promise<{
  books: Pick<
    BookInterface,
    "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
  >[];
}> {
  return new Promise(
    (
      resolve: (value: {
        books: Pick<
          BookInterface,
          "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
        >[];
      }) => void
    ): void => {
      server
        .get("/api/book/recommended")
        .then(
          (
            res: AxiosResponse<
              ResponseType<{
                books: Pick<
                  BookInterface,
                  "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
                >[];
              }>
            >
          ): void => {
            const { data } = res;
            console.log({ data });
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              resolve({
                books: [],
              });
              return;
            }
            const { books } = data.data as {
              books: Pick<
                BookInterface,
                "coverImageUrl" | "isbn" | "summary" | "authors" | "rating"
              >[];
            };
            console.log({
              books,
            });
            resolve({
              books,
            });
          }
        )
        .catch((e: AxiosError): void => {
          console.error(e);
          resolve({
            books: [],
          });
        });
    }
  );
}
