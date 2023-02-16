import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {

    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({
            message: "No auth token provided",
            status: "Unauthorized",
            code: 401
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(403).json({
                message: "Invalid token",
                status: "Forbidden",
                code: 403
            });
        };
        req.email = decoded.email;
        next();
    })
}