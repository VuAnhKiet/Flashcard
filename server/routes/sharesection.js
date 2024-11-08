import { validateToken } from '../middlewares/authMiddleware.js';
import { Router } from 'express';
import {
    getShareCard,
    addToShareSection,
    removeFromShareSection,
    getFriendsShareSetCard,
    getFriendsShareCard
} from '../controller/shareCardController.js';

const router = Router();

router.get("/", validateToken, getShareCard);

router.get("/friend-setcard/:id",validateToken,getFriendsShareSetCard)

router.get("/friend-card/:id",validateToken,getFriendsShareCard)

router.post("/add", validateToken, addToShareSection);

router.delete("/remove-from-section/:cardId", validateToken, removeFromShareSection);

export { router as shareCardsRouter };