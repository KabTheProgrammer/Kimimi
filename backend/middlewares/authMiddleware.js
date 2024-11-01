import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Or check for token in cookies
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


//Check if user is admin

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Not authorized as an admin.")
    }
}

export {authenticate, authorizeAdmin}