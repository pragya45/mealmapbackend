const router = require('express').Router();
const authController = require('../controllers/authController');

// for register
router.post('/register', authController.register);

module.exports = router;