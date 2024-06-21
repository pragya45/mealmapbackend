const router = require('express').Router();
const userController = require('../controllers/userController');

//for register
router.get('/register', userController.createUser)

module.exports = router;