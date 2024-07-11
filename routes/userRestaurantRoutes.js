const express = require('express');
const { authGuard } = require('../middleware/authGuard');
const {
    getSavedRestaurants,
    getLikedRestaurants,
    saveRestaurant,
    likeRestaurant,
    unsaveRestaurant,
    unlikeRestaurant,
    rateRestaurant
} = require('../controllers/userRestaurantController');

const router = express.Router();

router.get('/saved', authGuard, getSavedRestaurants);
router.get('/liked', authGuard, getLikedRestaurants);
router.post('/save', authGuard, saveRestaurant);
router.post('/like', authGuard, likeRestaurant);
router.post('/unsave', authGuard, unsaveRestaurant);
router.post('/unlike', authGuard, unlikeRestaurant);
router.post('/rate', authGuard, rateRestaurant);


module.exports = router;
