import { useEffect, useState, type JSX } from "react";
import QRCode from "react-qr-code";

function CheckInOutSystemPage(): JSX.Element {
  const [code, setcode] = useState<string>("");

  useEffect((): (() => void) => {
    const interval: number = setInterval((): void => {
      const now: number = Date.now();
      const base64Now: string = btoa(now.toString());
      setcode(base64Now);
    }, 5 * 1000);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full grow justify-center items-center p-8 gap-8`}>
      <div className={`text-center flex flex-col justify-center items-center`}>
        <h1 className={`text-3xl font-bold`}>Check In/Out System</h1>
        <p className={`text-lg`}>Scan the QR code to check in or out</p>
      </div>
      {code}
      <QRCode bgColor={"#f9f3ee"} className={`w-full`} value={code} />
    </div>
  );
}

export default CheckInOutSystemPage;
