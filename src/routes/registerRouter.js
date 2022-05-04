import { Router } from 'express';
import { createUser } from "../controllers/register.js"

const registerRouter = Router();

registerRouter.route('/').post(createUser);

export default registerRouter;