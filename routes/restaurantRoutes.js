const express = require('express');
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    filterRestaurantsByCategory,
    filterRestaurantsByDistance,
    filterRestaurantsByRating
} = require('../controllers/restaurantController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const router = express.Router();

router.get('/search', searchRestaurants);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, addRestaurant);
router.put('/:id', authGuardAdmin, updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);
router.get('/filter', filterRestaurantsByCategory);
router.get('/filter/distance', filterRestaurantsByDistance);
router.get('/filter/rating', filterRestaurantsByRating);

module.exports = router;
