const jwt = require('jsonwebtoken');

// Middleware to protect routes for authenticated users
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
        console.log("Decoded Data:", decodedData); // Debugging line
        req.user = { _id: decodedData.id }; // Adjust according to your token's payload
        next();
    } catch (error) {
        console.error("User token verification error:", error); // Debugging line
        return res.status(401).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

// Middleware to protect routes for admin users
const authGuardAdmin = (req, res, next) => {
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
        console.log("Decoded Admin Data:", decodedData); // Debugging line
        req.user = { _id: decodedData.id, isAdmin: decodedData.isAdmin }; // Make sure 'id' and 'isAdmin' matches the property in your JWT payload
        if (!decodedData.isAdmin) { // This assumes your token has an 'isAdmin' property
            return res.status(403).json({
                success: false,
                message: "Permission denied!"
            });
        }
        next();
    } catch (error) {
        console.error("Admin token verification error:", error); // Debugging line
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
