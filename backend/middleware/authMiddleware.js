import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';



const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Invalid Token")
        }
    }
    else {
        res.status(401);
        throw new Error("No Token")
    }
})

export { protect }