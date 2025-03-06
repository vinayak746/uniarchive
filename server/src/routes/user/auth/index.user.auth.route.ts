import { Router } from "express";
import UserLoginRoute from "./login.user.auth.route";

const userAuthRouter: Router = Router();

import UserSignUpRoute from "./register.user.auth.route";
import RefreshUserRoute from "./refresh.user.auth.route";
import LogoutUserRoute from "./logout.user.auth.route";

userAuthRouter.post("/register", UserSignUpRoute);
userAuthRouter.post("/login", UserLoginRoute);
userAuthRouter.post("/refresh", RefreshUserRoute);
userAuthRouter.post("/logout", LogoutUserRoute);

export default userAuthRouter;
