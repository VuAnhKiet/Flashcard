import jsonwebtoken from "jsonwebtoken"
import bcrypt from 'bcrypt';

export const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ 
        error: "User not logged in!" 
    });

    try {
        const validToken = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    }
    catch (err) {
        return res.json({ error: err });
    }
}