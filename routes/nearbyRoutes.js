const express = require('express');
const router = express.Router();
const { getNearbyRestaurants } = require('../controllers/nearbyController');

// Route to fetch nearby restaurants
router.get('/nearby', getNearbyRestaurants);

module.exports = router;
