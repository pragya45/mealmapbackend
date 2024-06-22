const express = require('express');
const { getRestaurants, getRestaurantById, addRestaurant } = require('../controllers/restaurantController');
const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', addRestaurant);

module.exports = router;
