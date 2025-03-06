import checkInOutSystemLoader, {
  CheckInOutSystemLoaderData,
} from "./checkinout.system.loader";
import { type JSX } from "react";
import QRCode from "react-qr-code";
import { useLoaderData } from "react-router-dom";

function CheckInOutSystemPage(): JSX.Element {
  const { code }: CheckInOutSystemLoaderData = useLoaderData<
    typeof checkInOutSystemLoader
  >() as CheckInOutSystemLoaderData;
  return (
    <div
      className={`flex flex-col w-full grow justify-center items-center p-8 gap-8`}>
      <div className={`text-center flex flex-col justify-center items-center`}>
        <h1 className={`text-3xl font-bold`}>Check In/Out System</h1>
        <p className={`text-lg`}>Scan the QR code to check in or out</p>
      </div>
      <QRCode className={`w-full`} value={code} />
    </div>
  );
}

export default CheckInOutSystemPage;
