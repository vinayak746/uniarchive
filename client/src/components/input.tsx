import { InputHTMLAttributes, useId, type JSX } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}
function Input({ labelText, className, ...rest }: InputProps): JSX.Element {
  const id: string = useId();
  return (
    <label className={`flex flex-col gap-1`} htmlFor={id}>
      <div className={`text-sm px-1`}>
        {labelText}
        {rest.required && <span className={`text-red-500`}> *</span>}
      </div>
      <input
        {...rest}
        className={`bg-white py-2 px-4 rounded-lg outline-none placeholder:text-dark/80 border border-primary focus:border-dark/50 ${className}`}
        id={id}
      />
    </label>
  );
}

export default Input;
