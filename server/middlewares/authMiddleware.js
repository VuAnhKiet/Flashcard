import jsonwebtoken from "jsonwebtoken"

export const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged in!" });

    try {
        const validToken = jsonwebtoken.verify(accessToken, "TokenToken");
        if (validToken) {
            return next();
        }
    }
    catch (err) {
        return res.json({ error: err });
    }
}