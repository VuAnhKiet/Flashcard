import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jsonwebtoken  from 'jsonwebtoken';

export async function getUser(req, res) {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function createUser(req, res) {
    try {
        const { fullname, password, email } = req.body;

        const user = await User.findOne({ where: { fullname: fullname } });

        if(user){
            return res.json({ error: "Please try another username!" });
        }
        else{
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                fullname: fullname,
                password: hash,
                email: email,
            })
        })
        res.json("Create success!");
    }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function userLogin(req, res) {
    try {
        const { fullname, password } = req.body;

        const user = await User.findOne({ where: { fullname: fullname } });

        if (!user) {
            res.json({ error: "User Doesn't Exist" });
        } else {
            bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    res.json({ error: "Wrong Username And Password Combination" });
                } else {
                    const accessToken = jsonwebtoken.sign({ fullname: user.fullname, id: user.id },
                        process.env.JWT_SECRET
                    );
                    res.json(accessToken);
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}



