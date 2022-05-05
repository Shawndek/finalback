import { Router } from 'express';
import { getUser } from "../controllers/user.js"
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.route('/').get(verifyToken, getUser);
//userRouter.route('/:username', verifyToken).get(getUserDetails);

export default userRouter;