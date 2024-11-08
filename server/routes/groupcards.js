import { validateToken } from '../middlewares/authMiddleware.js';
import { Router } from 'express';
import {
    getGroupCard,
    getCardByID,
    createGroupCard,
    deleteGroupCard,
    updateGroupCard,
    searchGroupCard
} from '../controller/groupCardsController.js';


const router = Router();

router.get("/", validateToken, getGroupCard);

router.get("/byId/:id", getCardByID);

router.get("/search", validateToken, searchGroupCard);

router.post("/", validateToken, createGroupCard);

router.delete("/:setcardId", validateToken, deleteGroupCard);

router.put("/", validateToken, updateGroupCard);

export { router as groupCardRouter };