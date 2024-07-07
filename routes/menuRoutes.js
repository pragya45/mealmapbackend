const express = require('express');
const { addMenuItem, getMenuItems } = require('../controllers/menuController');
const { authGuardAdmin } = require('../middleware/authGuard');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', authGuardAdmin, upload.single('image'), addMenuItem);
router.get('/:restaurantId', getMenuItems);

module.exports = router;
