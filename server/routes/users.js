import { Router } from 'express';
const router = Router();
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken  from 'jsonwebtoken';
import {validateToken} from '../middlewares/authMiddleware.js'

router.get("/",validateToken, async (req, res) => {
    res.json(req.user);
});

router.post("/", async (req, res) => {
    const { fullname, password, email } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            fullname: fullname,
            password: hash,
            email: email,
        })
    })
    res.json("Create success!");
});

router.post("/login", async (req, res) => {
    const { fullname, password } = req.body;

    const user = await User.findOne({ where: { fullname: fullname } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" });
            } else {
                const accessToken=jsonwebtoken.sign({fullname:user.fullname,id:user.id},
                    "TokenToken"
                );
                res.json(accessToken);
            }
        });
    }
});

export { router as userRouter };