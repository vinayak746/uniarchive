import { type LoaderFunction } from "react-router-dom";
import server from "../../utils/axios.util";
import { AxiosResponse } from "axios";
import { ResponseType } from "../../utils/response.util";
import { BookInterface } from "../../types/books.types";
import { IssueStatus } from "../../types/issue.types";
import { toast } from "react-toastify";
import wtf from "../../utils/errors.util";

export type HistoryLoaderData = {
  _id: string;
  book: BookInterface;
  issueDate: Date;
  dueDate: Date;
  returnDate: Date;
  fineAmount: number;
  status: IssueStatus;
}[];

const historyLoader: LoaderFunction = (): Promise<
  Response | HistoryLoaderData
> => {
  return new Promise(
    (
      resolve: (value: Response | HistoryLoaderData) => void,
      reject: (reason?: unknown) => void
    ): void => {
      server
        .post("/api/book/history")
        .then(
          ({ data }: AxiosResponse<ResponseType<HistoryLoaderData>>): void => {
            if (!data.success) {
              data.errors.forEach((error: string): void => {
                toast.error(error);
              });
              return;
            }
            if (!data.data) {
              throw wtf();
            }
            resolve(data.data);
          }
        )
        .catch((error: unknown): void => {
          reject(error);
        });
    }
  );
};

export default historyLoader;
