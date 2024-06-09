import { Router } from 'express';
const router = Router();
import { Group_card } from '../models/Group_card.js';
import { Card } from '../models/Card.js';
import { validateToken } from '../middlewares/authMiddleware.js';
import jsonwebtoken from "jsonwebtoken"

router.get("/",validateToken, async (req, res) => {
    // if (validateToken)
    // {
        const userId = req.user.id;
        const listOfSetCards = await Group_card.findAll({where:{userId:userId}});
        res.json(listOfSetCards);
    // }
    // else{
    //     listOfSetCards=[];
    //     console.log(error);
    //     res.json(listOfSetCards);
    // }
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const setcards = await Card.findAll({ where: { groupCardId: id } });
    res.json(setcards);
})


router.post("/", validateToken, async (req, res) => {
    const set_card = req.body;
    const userId = req.user.id;
    set_card.userId = userId;
    const setcard=await Group_card.create(set_card);
    res.json(setcard);
})

router.delete("/:setcardId",validateToken, async(req,res)=>{
    const setcardId=req.params.setcardId;
    await Group_card.destroy({
        where:{
            id:setcardId,
        }
    })
    res.json("Deleted!")
})

router.put("/",validateToken,async(req,res)=>{
    const {name,id}=req.body;
    const editsetcard=await Group_card.update({name:name},{where:{id:id}});
    res.json(editsetcard);
})

export { router as SetcardRouter };