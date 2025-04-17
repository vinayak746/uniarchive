import { type JSX, SelectHTMLAttributes, useId } from "react";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  labelText: string;
  options?: { value: string; label: string; disabled?: boolean }[];
}

export default function Select({
  options,
  labelText,
  className,
  ...rest
}: SelectProps): JSX.Element {
  const id: string = useId();
  return (
    <label className={`flex w-full flex-col gap-1`} htmlFor={id}>
      <div className={`text-sm px-1`}>
        {labelText}
        {rest.required && <span className={`text-red-500`}> *</span>}
      </div>
      <select
        id={id}
        className={`bg-white w-full py-2 px-4 rounded-lg outline-none placeholder:text-dark/80 border border-primary focus:border-dark/50 ${className}`}
        {...rest}>
        {options?.map(
          ({
            value,
            label,
            disabled = false,
          }: {
            value: string;
            label: string;
            disabled?: boolean;
          }): JSX.Element => (
            <option
              className={`text-dark/80`}
              key={value}
              value={value}
              disabled={disabled}>
              {label}
            </option>
          )
        )}
      </select>
    </label>
  );
}
