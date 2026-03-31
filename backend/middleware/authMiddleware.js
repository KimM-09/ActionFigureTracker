import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = async(req, res, next) => {
    let token;

    //check if token exists in headers
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //attach user to the request (excluding password)
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch(error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if(!token){
        res.status(401).json({ message: "Not authorized, no token" })
    }
};
