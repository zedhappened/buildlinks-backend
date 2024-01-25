import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header("Authorization")

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return next()
    }

    try {
        const payload = jwt.verify(authorizationHeader.replace("Bearer ", ""), process.env.JWT_SECRET);

        req.user = payload
    } finally {
        return next()
    }
}