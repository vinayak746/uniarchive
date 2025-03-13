import { FileUpIcon } from "lucide-react";
import { InputHTMLAttributes, useId, type JSX } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  inputClassName?: string;
}

function FileInput({
  labelText,
  className,
  inputClassName,
  ...rest
}: TextAreaProps): JSX.Element {
  const id: string = useId();
  return (
    <label className={`flex flex-col gap-1`} htmlFor={id}>
      <div className={`text-sm px-1`}>
        {labelText}
        {rest.required && <span className={`text-red-500`}> *</span>}
      </div>
      <div
        className={`flex justify-center items-center  aspect-square bg-white text-dark/70 py-2 px-4 rounded-lg outline-none border-primary focus:border-dark/50 ${className}`}>
        <FileUpIcon size={56} />
      </div>
      <input className={`hidden ${inputClassName}`} {...rest} id={id} />
    </label>
  );
}
export default FileInput;
