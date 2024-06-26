const express = require('express');
const { saveRestaurant, likeRestaurant, getSavedRestaurants, getLikedRestaurants } = require('../controllers/userRestaurantController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/save/:restaurantId', authGuard, saveRestaurant);
router.post('/like/:restaurantId', authGuard, likeRestaurant);
router.get('/saved', authGuard, getSavedRestaurants);
router.get('/liked', authGuard, getLikedRestaurants);

module.exports = router;
