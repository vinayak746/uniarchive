import { type JSX, RefObject, useEffect, useId, useRef } from "react";
import { type CameraDevice, Html5Qrcode } from "html5-qrcode";

interface QRCodeScannerProps {
  onSuccessCB: (decodedString: string) => void;
  onErrorCB?: (errorMessage: string) => void;
}

function QRCodeScanner({
  onSuccessCB,
  onErrorCB,
}: QRCodeScannerProps): JSX.Element {
  const qrReaderID: string = useId();
  const lastScanTime: RefObject<number> = useRef(Date.now());

  useEffect((): (() => void) => {
    const qrCode = new Html5Qrcode(qrReaderID);
    Html5Qrcode.getCameras().then((cameras: CameraDevice[]): void => {
      if (cameras && cameras.length) {
        const cameraId: string = cameras[0].id;
        qrCode.start(
          cameraId,
          {
            fps: 10,
            aspectRatio: 1,
            videoConstraints: {
              facingMode: "environment",
              aspectRatio: { exact: 1 },
              width: { ideal: 1080 },
              height: { ideal: 1080 },
            },
          },
          (decodedString: string): void => {
            // prevent multiple scans in quick succession
            const currentTime: number = Date.now();
            if (currentTime - lastScanTime.current < 5000) return;
            lastScanTime.current = currentTime;
            onSuccessCB(decodedString);
          },
          onErrorCB || ((): void => {})
        );
      }
    });

    return (): void => {
      if (qrCode.isScanning) {
        console.log("attempting to stop QR code scanning");
        qrCode.pause();
        qrCode
          .stop()
          .then((): void => {
            console.log("QR code scanning stopped");
            qrCode.clear();
          })
          .catch(console.error);
      } else {
        qrCode.clear();
      }
    };
  }, [onErrorCB, onSuccessCB, qrReaderID]);

  return (
    <div
      className={`relative h-full max-h-[20rem] aspect-square overflow-hidden rounded-4xl`}>
      <div
        className={`w-full z-10 aspect-square border-[1.5rem] border-dark/30 absolute top-0 left-0 rounded-4xl`}
      />
      <div
        className={`aspect-square bg-primary rounded-xl overflow-hidden`}
        id={qrReaderID}
      />
    </div>
  );
}

export default QRCodeScanner;
