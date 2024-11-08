import { validateToken } from '../middlewares/authMiddleware.js'
import { Router } from 'express';
import {
    getUser,
    createUser,
    userLogin,
    resetPassword,
    sendMail,
    getFriend,
    sendRequest,
    getPendingFriends,
    acceptFriends,
    rejectFriends,
    searchFriends,
    Unfriend
} from '../controller/userController.js';

const router = Router();

router.get("/", validateToken, getUser);

router.get("/friends", validateToken, getFriend)

router.get("/search-friends", validateToken, searchFriends)

router.post("/", createUser);

router.post("/login", userLogin);

router.post("/reset-password", sendMail);

router.post("/reset-password/:token", resetPassword)

router.post("/friend-request", validateToken, sendRequest)

router.get('/friend-requests', validateToken, getPendingFriends)

router.put("/friend-requests/:id/accept", validateToken, acceptFriends)

router.put("/friend-requests/:id/reject", validateToken, rejectFriends)

router.delete("/unfriend/:id",validateToken, Unfriend)



export { router as userRouter };