import { Router } from 'express';
const router=Router();
import { Card } from '../models/Card.js';
import { validateToken } from '../middlewares/authMiddleware.js';
router.get("/", async (req,res)=>{
    const listOfCards=await Card.findAll();
    res.json(listOfCards);
});


router.post("/",validateToken, async(req,res)=>{
    const card = req.body;
    const newcard=await Card.create(card);
    res.json(newcard);
});

router.delete("/:cardId",validateToken, async(req,res)=>{
    const cardId=req.params.cardId;
    await Card.destroy({
        where:{
            id:cardId,
        }
    });
    res.json("Deleted!")
})

router.put("/",validateToken,async(req,res)=>{
    const {word,defination,id}=req.body;
    const editcard=await Card.update({word:word,defination:defination},{where:{id:id}});
    res.json(editcard);
})

export {router as cardRouter};