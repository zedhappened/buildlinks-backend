import { Router } from "express";
import { signIn, signUp } from "../controllers";
import { isLoggedIn } from "../middlewares";

const userRouter = Router();

userRouter.post('/sign-in', isLoggedIn(false), signIn);
userRouter.post('/sign-up', isLoggedIn(false), signUp);

export default userRouter;