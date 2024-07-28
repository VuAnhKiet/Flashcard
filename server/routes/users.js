import {validateToken} from '../middlewares/authMiddleware.js'
import { getUser,createUser,userLogin } from '../controller/userController.js';
import { Router } from 'express';
const router = Router();

router.get("/",validateToken,getUser);

router.post("/", createUser);

router.post("/login", userLogin);

export { router as userRouter };