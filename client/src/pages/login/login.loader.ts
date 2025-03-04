import { type LoaderFunction } from "react-router-dom";

const LoginLoader: LoaderFunction = (): Promise<void> => {
  return new Promise<void>(
    (
      resolve: () => void
      // reject: (reason?: Error) => void
    ): void => {
      resolve();
    }
  );
};

export default LoginLoader;
