import { z, type ZodString } from "zod";
import { UserRoles } from "../../db/models/user.model";

export const userNameSchema: ZodString = z
  .string({
    required_error: "Name is required",
    description: "Name of the user",
    invalid_type_error: "Name must be a string",
  })
  .min(3, {
    message: "Name must be at least 3 characters long",
  })
  .max(50, {
    message: "Name must be at most 50 characters long",
  });

export const userUIDSchema: ZodString = z
  .string({
    required_error: "UID is required",
    description: "Unique identifier of the user",
    invalid_type_error: "UID must be a string",
  })
  .length(10, {
    message: "UID must be 10 characters long",
  })
  .regex(
    // regex for UIDs in the format XXYYYZZZZZ or XXyyZZZZZ,
    // where the first two characters symbolize the batch,
    // the next three characters symbolize the department,
    // and the last five characters symbolize the roll number
    /^[0-9]{2}[a-zA-Z]{3}[0-9]{5}$/,
    {
      message: "Invalid UID format",
    }
  );
export const userPasswordSchema: ZodString = z
  .string({
    required_error: "Password is required",
    description: "Password of the user",
    invalid_type_error: "Password must be a string",
  })
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .max(50, {
    message: "Password must be at most 50 characters long",
  });

export const userRoleSchema: z.ZodNativeEnum<typeof UserRoles> =
  z.nativeEnum(UserRoles);
