import { Router } from 'express';
const router=Router();
import { Card } from '../models/Card.js';
import { validateToken } from '../middlewares/authMiddleware.js';
router.get("/", async (req,res)=>{
    const listOfCards=await Card.findAll();
    res.json(listOfCards);
});


router.post("/", async(req,res)=>{
    const card = req.body;
    await Card.create(card);
    res.json(card);
});

export {router as cardRouter};