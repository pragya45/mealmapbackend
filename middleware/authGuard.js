// const jwt = require('jsonwebtoken');
// const User = require('../model/userModel');

// // Middleware to protect routes
// const authGuard = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({
//             success: false,
//             message: "Authorization header missing!"
//         });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Token missing!"
//         });
//     }

//     try {
//         const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { _id: decodedData.id };
//         next();
//     } catch (error) {
//         console.error("User token verification error:", error);
//         return res.status(401).json({
//             success: false,
//             message: "Invalid token!"
//         });
//     }
// };

// // Middleware to protect admin routes
// const authGuardAdmin = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({
//             success: false,
//             message: "Authorization header missing!"
//         });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Token missing!"
//         });
//     }

//     try {
//         const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { _id: decodedData.id, isAdmin: decodedData.isAdmin };
//         if (!decodedData.isAdmin) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Permission denied!"
//             });
//         }
//         next();
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             // Handle token expiration
//             const newToken = await refreshToken(token);
//             if (newToken) {
//                 res.setHeader('Authorization', `Bearer ${newToken}`);
//                 const decodedData = jwt.verify(newToken, process.env.JWT_SECRET);
//                 req.user = { _id: decodedData.id, isAdmin: decodedData.isAdmin };
//                 if (!decodedData.isAdmin) {
//                     return res.status(403).json({
//                         success: false,
//                         message: "Permission denied!"
//                     });
//                 }
//                 next();
//             } else {
//                 return res.status(401).json({
//                     success: false,
//                     message: "Token expired and refresh failed"
//                 });
//             }
//         } else {
//             console.error("Admin token verification error:", error);
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token!"
//             });
//         }
//     }
// };

// // Function to refresh token
// const refreshToken = async (expiredToken) => {
//     try {
//         const { email } = jwt.decode(expiredToken);
//         const user = await User.findOne({ email });
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const newToken = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         return newToken;
//     } catch (error) {
//         console.error('Token refresh failed:', error);
//         return null;
//     }
// };

// module.exports = {
//     authGuard,
//     authGuardAdmin,
// };
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// Middleware to protect routes
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

// Middleware to protect admin routes
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
        if (error.name === 'TokenExpiredError') {
            // Handle token expiration
            const newToken = await refreshToken(token);
            if (newToken) {
                res.setHeader('Authorization', `Bearer ${newToken}`);
                const decodedData = jwt.verify(newToken, process.env.JWT_SECRET);
                req.user = { _id: decodedData.id, isAdmin: decodedData.isAdmin };
                if (!decodedData.isAdmin) {
                    return res.status(403).json({
                        success: false,
                        message: "Permission denied!"
                    });
                }
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Token expired and refresh failed"
                });
            }
        } else {
            console.error("Admin token verification error:", error);
            return res.status(401).json({
                success: false,
                message: "Invalid token!"
            });
        }
    }
};

// Function to refresh token
const refreshToken = async (expiredToken) => {
    try {
        const { email } = jwt.decode(expiredToken);
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const newToken = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return newToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
};

module.exports = {
    authGuard,
    authGuardAdmin,
};
