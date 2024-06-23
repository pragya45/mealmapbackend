const express = require('express');
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    filterRestaurantsByCategory
} = require('../controllers/restaurantController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const router = express.Router();

router.get('/search', searchRestaurants);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, addRestaurant);
router.put('/:id', authGuardAdmin, updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);
router.get('/filter', filterRestaurantsByCategory);  // This is the filter route

module.exports = router;
