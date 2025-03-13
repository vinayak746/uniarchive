import User, { type UserInterface } from "../db/models/user.model";

export function getUserByUID(uid: string): Promise<UserInterface> {
  return new Promise<UserInterface>(
    (
      resolve: (value: UserInterface) => void,
      reject: (reason?: any) => void
    ): void => {
      User.findOne({
        uid,
      })
        .then((user: UserInterface | null): void => {
          if (!user) {
            reject(new Error("User not found"));
            return;
          }
          resolve(user);
        })
        .catch(reject);
    }
  );
}

type CreateUserParams = Pick<UserInterface, "name" | "uid" | "role"> & {
  password: string;
};

export function createUser({
  name,
  uid,
  password,
  role,
}: CreateUserParams): Promise<UserInterface> {
  return new Promise<UserInterface>(
    (
      resolve: (value: UserInterface) => void,
      reject: (reason?: any) => void
    ): void => {
      // check if user already exists
      User.findOne({
        uid,
      })
        .then((user: UserInterface | null): void => {
          if (user) {
            return reject(new Error("User already exists"));
          }
          const newUser = new User({
            name,
            uid,
            role,
          });
          newUser
            .hashPassword(password)
            .then((): void => {
              newUser
                .save()
                .then(resolve)
                .catch((): void => {
                  reject(new Error("Error creating user"));
                });
            })
            .catch((): void => {
              reject(new Error("Error hashing password"));
            });
        })
        .catch((): void => {
          reject(new Error("Error finding user"));
        });
    }
  );
}

export function updateUser(
  uid: string,
  update: Partial<UserInterface>
): Promise<UserInterface> {
  return new Promise<UserInterface>(
    (
      resolve: (value: UserInterface) => void,
      reject: (reason?: any) => void
    ): void => {
      User.findOneAndUpdate(
        {
          uid,
        },
        update,
        {
          new: true,
        }
      )
        .then((user: UserInterface | null): void => {
          if (!user) {
            return reject(new Error("User not found"));
          }
          return resolve(user);
        })
        .catch(reject);
    }
  );
}

export function deleteUser(uid: string): Promise<UserInterface> {
  return new Promise<UserInterface>(
    (
      resolve: (value: UserInterface) => void,
      reject: (reason?: any) => void
    ): void => {
      User.findOneAndDelete({
        uid,
      })
        .then((user: UserInterface | null): void => {
          if (!user) {
            return reject(new Error("User not found"));
          }
          return resolve(user);
        })
        .catch(reject);
    }
  );
}
