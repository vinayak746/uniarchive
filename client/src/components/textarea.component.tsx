import { JSX, TextareaHTMLAttributes, useId } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText: string;
}

function TextArea({
  labelText,
  className,
  ...rest
}: TextAreaProps): JSX.Element {
  const id: string = useId();
  return (
    <label className={`flex flex-col gap-1`} htmlFor={id}>
      <div className={`text-sm px-1`}>
        {labelText}
        {rest.required && <span className={`text-red-500`}> *</span>}
      </div>
      <textarea
        {...rest}
        className={`bg-white py-2 px-4 rounded-lg outline-none placeholder:text-dark/80 border border-primary focus:border-dark/50 ${className}`}
        id={id}
      />
    </label>
  );
}

export default TextArea;
