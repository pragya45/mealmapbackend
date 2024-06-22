const express = require('express');
const { getRestaurants, getRestaurantById, addRestaurant, searchRestaurants } = require('../controllers/restaurantController');
const router = express.Router();

router.get('/search', searchRestaurants); // Define the search route first
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', addRestaurant);

module.exports = router;
