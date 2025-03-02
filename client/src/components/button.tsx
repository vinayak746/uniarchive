import { ButtonHTMLAttributes, type JSX } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
}

function Button({
  children,
  className,
  icon,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`flex justify-center items-center px-4 py-2 gap-2 outline-none font-semibold text-white bg-tertiary rounded-lg w-3/4 cursor-pointer ${className}`}
      {...rest}>
      {children}
      {icon}
    </button>
  );
}

export default Button;
