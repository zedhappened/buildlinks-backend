import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/is-logged-in.middleware.js";

const userRouter = Router();

userRouter.post('/sign-in', isLoggedIn(false), signIn);
userRouter.post('/sign-up', isLoggedIn(false), signUp);

export default userRouter;