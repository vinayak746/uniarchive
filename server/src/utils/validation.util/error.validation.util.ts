import { ZodError, ZodIssue } from "zod";

export default function errorsFromZodIssue(error: ZodError): string[] {
  return error.errors.map((issue: ZodIssue): string => issue.message);
}
