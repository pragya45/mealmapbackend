const express = require('express');
const {
    getRestaurants,
    getFeaturedRestaurants,
    addRestaurant,
    searchRestaurants,
    getRestaurantById

} = require('../controllers/restaurantController');
const { authGuardAdmin } = require('../middleware/authGuard');
const parser = require('../middleware/cloudinaryConfig');
const router = express.Router();

router.get('/featured', getFeaturedRestaurants);
router.get('/', getRestaurants);
router.post('/', authGuardAdmin, parser.single('image'), addRestaurant);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);

module.exports = router;
