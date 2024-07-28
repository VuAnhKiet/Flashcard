import { validateToken } from '../middlewares/authMiddleware.js';
import { getGroupCard,getCardByID,createGroupCard,deleteGroupCard,updateGroupCard } from '../controller/setcardsController.js';
import { Router } from 'express';
const router = Router();

router.get("/",validateToken,getGroupCard);

router.get("/byId/:id",getCardByID )

router.post("/", validateToken, createGroupCard)

router.delete("/:setcardId",validateToken,deleteGroupCard )

router.put("/",validateToken,updateGroupCard)

export { router as SetcardRouter };