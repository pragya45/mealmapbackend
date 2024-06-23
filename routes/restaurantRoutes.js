const express = require('express');
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants
} = require('../controllers/restaurantController');
const { authGuardAdmin } = require('../middleware/authGuard');
const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, addRestaurant);
router.put('/:id', authGuardAdmin, updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);
router.get('/search', searchRestaurants);

module.exports = router;
