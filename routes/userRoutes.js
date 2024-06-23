const express = require('express');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected-route', authGuard, (req, res) => {
    res.status(200).json({ success: true, message: "You have access to this route" });
});

router.get('/admin-route', authGuardAdmin, (req, res) => {
    res.status(200).json({ success: true, message: "You have access to this admin route" });
});

module.exports = router;
