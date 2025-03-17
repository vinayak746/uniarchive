import { toast } from "react-toastify";
import { ScanQrCode } from "lucide-react";
import { type AxiosResponse } from "axios";
import server from "../../utils/axios.util";
import QRCodeScanner from "../../components/qrscanner.component";
import { type RefObject, useRef, type JSX } from "react";
import { type ResponseType } from "../../utils/response.util";
import { SessionData, useRouteLoaderData } from "react-router-dom";
import RootLayoutLoader from "../../components/layout.component/layout.loader";

function CheckInOutPage(): JSX.Element {
  const session: SessionData = useRouteLoaderData<typeof RootLayoutLoader>(
    "layout"
  ) as SessionData;
  const qrText: RefObject<string | null> = useRef(null);

  return (
    <div
      className={`flex flex-col w-full grow justify-center items-center p-8 gap-8`}>
      <QRCodeScanner
        onSuccessCB={(decodedString: string): void => {
          if (qrText.current === decodedString) return;
          setTimeout((): void => {
            qrText.current = null;
          }, 5000);
          qrText.current = decodedString;
          server.post("/api/user/checkinout", { code: decodedString }).then(
            ({
              data,
            }: AxiosResponse<
              ResponseType<{
                checkedIn: boolean;
              }>
            >): void => {
              if (data.success) {
                if (session.loggedIn)
                  if (data.data?.checkedIn) {
                    // always true, but just for type checking
                    toast.success(`Checked In as ${session.user.name}`);
                  } else {
                    toast.success(`Checked Out as ${session.user.name}`);
                  }
              } else {
                data.errors.forEach((error: string): void => {
                  toast.error(error);
                });
              }
            }
          );
        }}
      />

      <div
        className={`flex gap-2 justify-center items-center flex-col text-center`}>
        <ScanQrCode className={`text-dark/80`} size={40} />
        <div>
          Scan the QR code in the library <br />
          to check in or out
        </div>
      </div>
    </div>
  );
}

export default CheckInOutPage;
