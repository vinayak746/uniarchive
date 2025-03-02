import { type JSX } from "react";
import { Form as RRForm, FormProps as RRFormProps } from "react-router-dom";

interface FormProps extends RRFormProps {
  formHeading: string;
}

function Form({
  children,
  className,
  formHeading,
  ...rest
}: FormProps): JSX.Element {
  return (
    <RRForm
      className={`flex flex-col justify-center items-center bg-secondary p-8 gap-4 rounded-3xl ${className}`}
      {...rest}>
      <div className={`font-semibold text-center text-3xl`}>{formHeading}</div>
      {children}
    </RRForm>
  );
}

export default Form;
