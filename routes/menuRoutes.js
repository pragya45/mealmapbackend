const express = require('express');
const { addMenuItem, getMenuItems, getPopularItems } = require('../controllers/menuController');
const { authGuardAdmin } = require('../middleware/authGuard');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', authGuardAdmin, upload.single('image'), addMenuItem);
router.get('/:restaurantId', getMenuItems);
router.get('/popular/:restaurantId', getPopularItems);

module.exports = router;
