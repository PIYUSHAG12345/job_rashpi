import jwt from "jsonwebtoken"

export const isAuthenticated = async(req, res, next) => {
    const token = req.cookies.token; 
    
    if (!token) {
        return next(res.status(401).json({ success : false,message: "Access Denied: No Token Provided" }));
    }

    const decoded =  jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id);
    next();
};