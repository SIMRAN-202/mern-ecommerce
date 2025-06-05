import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error("No token, please login first");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(403);
        throw new Error("Invalid token");
    }
});


const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401); // Forbidden
        throw new Error("Not authorized as admin");
    }
};


export { authenticate,authorizeAdmin }