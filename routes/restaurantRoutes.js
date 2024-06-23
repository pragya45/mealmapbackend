const express = require('express');
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants
} = require('../controllers/restaurantController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

const router = express.Router();

router.get('/search', searchRestaurants); // Ensure this is defined first
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, addRestaurant);
router.put('/:id', authGuardAdmin, updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);

module.exports = router;
