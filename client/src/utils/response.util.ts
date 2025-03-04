export type ResponseType<T = never> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      errors: string[];
    };
