import { validateToken } from '../middlewares/authMiddleware.js';
import { Router } from 'express';
import {
    getlistCard,
    createCard,
    deleteCard,
    updateCard,
    searchCard
} from '../controller/cardController.js';

const router = Router();

router.get("/", validateToken, getlistCard);

router.get("/search", searchCard)

router.post("/", validateToken, createCard);

router.delete("/:cardId", validateToken, deleteCard)

router.put("/", validateToken, updateCard)

export { router as cardRouter };