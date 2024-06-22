const express = require('express');
const { getRestaurants, getRestaurantById, addRestaurant, searchRestaurants } = require('../controllers/restaurantController');
const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', addRestaurant);
router.get('/search', searchRestaurants);


module.exports = router;
