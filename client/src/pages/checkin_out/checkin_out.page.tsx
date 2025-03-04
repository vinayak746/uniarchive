import { useEffect, type JSX } from "react";
import { ScanQrCode } from "lucide-react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

function CheckInOutPage(): JSX.Element {
  useEffect((): (() => void) => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
        videoConstraints: {
          facingMode: "environment",
          aspectRatio: { exact: 1 },
          backgroundBlur: true,
        },
        aspectRatio: 1,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    qrCodeScanner.render(
      (decodedText: string): void => {
        console.log("Decoded QR Code:", decodedText);
      },
      (): void => {}
    );

    const scanRegion: HTMLElement | null = document.getElementById(
      "qr-reader__scan_region"
    );
    if (scanRegion) {
      scanRegion.classList.add(
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "rounded-2xl",
        "aspect-square"
      );
    }

    return (): void => {
      qrCodeScanner.clear();
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full grow justify-center items-center p-8 gap-8`}>
      <div
        className={`flex justify-center items-center bg-primary p-4 rounded-3xl border border-dark/50  overflow-hidden`}>
        <div className={`h-64 flex aspect-square rounded-3xl overflow-hidden`}>
          <div
            className={`flex grow flex-col justify-center items-center text-center`}
            id="qr-reader"
          />
        </div>
      </div>
      <div
        className={`flex  gap-2 justify-center items-center flex-col text-center`}>
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
