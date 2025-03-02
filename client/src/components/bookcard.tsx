import { ImgHTMLAttributes, type JSX } from "react";

interface BookCardProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
}

function BookCard({
  size = "sm",
  className,
  ...rest
}: BookCardProps): JSX.Element {
  return (
    <img
      {...rest}
      className={`h-60 ${
        size == "sm" ? "sm:h-60" : size === "md" ? "sm:h-68" : "sm:h-76"
      } aspect-[3/4] temp object-cover rounded-lg  z-10 ${className}`}
    />
  );
}

export default BookCard;
