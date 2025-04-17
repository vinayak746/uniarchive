import { type JSX } from "react";

function NotFoundPage(): JSX.Element {
  return (
    <div className={`flex grow justify-center items-center p-4`}>
      <div className={`flex gap-8 flex-col justify-center mx-auto`}>
        <h1 className={`text-5xl sm:text-6xl font-bold`}>
          Oh No!
          <br />
          Error 404
        </h1>
        <div className={`text-2xl max-w-md text-dark/80`}>
          We couldn't find that book...or page. Perhaps it's on a different
          shelf?
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
