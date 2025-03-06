import { type AxiosResponse } from "axios";
import server from "../../../utils/axios.util";
import { type LoaderFunction } from "react-router-dom";
import { type ResponseType } from "../../../utils/response.util";

export interface CheckInOutSystemLoaderData {
  code: string;
}

const checkInOutSystemLoader: LoaderFunction = (): Promise<
  CheckInOutSystemLoaderData | Response
> => {
  return new Promise<CheckInOutSystemLoaderData | Response>(
    (
      resolve: (value: CheckInOutSystemLoaderData | Response) => void,
      reject: (reason?: unknown) => void
    ): void => {
      server
        .get("/api/system/checkinout")
        .then(
          ({
            data,
          }: AxiosResponse<ResponseType<CheckInOutSystemLoaderData>>): void => {
            if (data.success) {
              if (!data.data?.code) {
                reject();
                return;
              }
              console.log(data.data.code);
              resolve({
                code: data.data.code,
              });
            } else {
              data.errors.forEach((error: string): void => {
                console.error(error);
              });
            }
          }
        )
        .catch((error: Error): void => {
          console.error(error);
        });
    }
  );
};

export default checkInOutSystemLoader;
