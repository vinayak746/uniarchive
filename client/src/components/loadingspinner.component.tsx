import { Loader2 } from "lucide-react";
import { type JSX } from "react";

function LoadingSpinner(): JSX.Element {
  return (
    <div className={`flex justify-center items-center grow`}>
      <Loader2 className={`animate-spin text-dark/80`} size={64} />
    </div>
  );
}

export default LoadingSpinner;
