const router = require('express').Router();
const userController = require('../controllers/userController');

// for register
router.post('/register', userController.createUser);

module.exports = router;
