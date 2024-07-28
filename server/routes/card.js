import { validateToken } from '../middlewares/authMiddleware.js';
import { getlistCard,createCard,deleteCard,updateCard } from '../controller/cardController.js';
import { Router } from 'express';
const router=Router();

router.get("/",validateToken, getlistCard);

router.post("/",validateToken,createCard );

router.delete("/:cardId",validateToken,deleteCard )

router.put("/",validateToken,updateCard)

export {router as cardRouter};