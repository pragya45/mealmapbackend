const express = require('express');
const { getFeaturedRestaurants } = require('../controllers/featuredRestaurantController');
const router = express.Router();

router.get('/', getFeaturedRestaurants);

module.exports = router;
