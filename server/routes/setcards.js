import { Router } from 'express';
const router=Router();
import { Group_card } from '../models/Group_card.js';
import { Card } from '../models/Card.js';


router.get("/", async (req,res)=>{
    const listOfSetCards=await Group_card.findAll();
    res.json(listOfSetCards);
});

router.get("/byId/:id", async (req,res)=>{
    const id=req.params.id;
    const setcards=await Card.findAll({where:{groupCardId:id}});
    res.json(setcards);
})


router.post("/", async(req,res)=>{
    const set_card = req.body;
    await Group_card.create(set_card);
    res.json(set_card);
});

export {router as SetcardRouter};