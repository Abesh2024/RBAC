import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";


const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token, "token");
        
        if(!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized",
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decode.userid);
        if(!user) {
            return res.status(401).json({
                status: false,
                message: "User not fount in the Data Base",
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.json.status(403).json({
            status: false,
            message: "Invalid token",
        })
    }
}

export default verifyUser;