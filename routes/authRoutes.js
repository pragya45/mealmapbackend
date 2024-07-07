const express = require('express');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const { register, login, refreshToken } = require('../controllers/authController');
const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Protected route for authenticated users
router.get('/protected-route', authGuard, (req, res) => {
    res.status(200).json({ success: true, message: "You have access to this route" });
});

// Protected route for admin users
router.get('/admin-route', authGuardAdmin, (req, res) => {
    res.status(200).json({ success: true, message: "You have access to this admin route" });
});

router.post('/refresh-token', refreshToken);


module.exports = router;
