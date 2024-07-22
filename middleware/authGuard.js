const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing!"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing!"
        });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decodedData.id };
        next();
    } catch (error) {
        console.error("User token verification error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

const authGuardAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing!"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing!"
        });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decodedData.id, isAdmin: decodedData.isAdmin };
        if (!decodedData.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Permission denied!"
            });
        }
        next();
    } catch (error) {
        console.error("Admin token verification error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

module.exports = {
    authGuard,
    authGuardAdmin,
};
