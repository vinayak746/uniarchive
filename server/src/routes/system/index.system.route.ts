import { Router } from "express";
import CheckInOutSystemRoute from "./checkinout.system.route";

const systemRouter: Router = Router();

systemRouter.get("/checkinout", CheckInOutSystemRoute);

export default systemRouter;
