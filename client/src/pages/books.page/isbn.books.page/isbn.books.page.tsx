import { JSX } from "react";
import { useParams } from "react-router-dom";

function BookByISBNPage(): JSX.Element {
  const { isbn } = useParams();
  return <div>{isbn}</div>;
}

export default BookByISBNPage;
