import Password, {
  type HashedPassword,
} from "../../utils/password.util/index.password.util";
import { type Document, type Model, model, Schema } from "mongoose";

export enum UserRoles {
  UGSTUDENT = "UGSTUDENT",
  PGSTUDENT = "PGSTUDENT",
  RESEARCHSCHOLAR = "RESEARCHSCHOLAR",
  FACULTY = "FACULTY",
  NONACADEMICSTAFF = "NONACADEMICSTAFF",
  ALUMNI = "ALUMNI",
  VISITINGFACULTY = "VISITINGFACULTY",
}

export interface UserInterface extends Document {
  name: string;
  uid: string;
  password: HashedPassword;
  role: UserRoles;
  checkedIn: boolean;
  hashPassword(password: string): Promise<{ hash: string; salt: string }>;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    default: UserRoles.UGSTUDENT,
  },
  checkedIn: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
});

UserSchema.methods.hashPassword = function (password: string): Promise<{
  hash: string;
  salt: string;
}> {
  return new Promise(
    (
      resolve: (value: { hash: string; salt: string }) => void,
      reject: (reason?: any) => void
    ): void => {
      const pswd: Password = new Password(password);
      pswd
        .hash()
        .then(({ hash, salt }: HashedPassword): void => {
          this.password.hash = hash;
          this.password.salt = salt;
          resolve({ hash, salt });
        })
        .catch((error: Error): void => {
          reject(error);
        });
    }
  );
};

UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return new Promise(
    (
      resolve: (value: boolean) => void,
      reject: (reason?: any) => void
    ): void => {
      const pswd: Password = new Password(password, this.password.salt);
      pswd
        .compare(this.password.hash)
        .then((result: boolean): void => {
          resolve(result);
        })
        .catch((error: Error): void => {
          reject(error);
        });
    }
  );
};

const User: Model<UserInterface> = model<UserInterface>("User", UserSchema);

export default User;
