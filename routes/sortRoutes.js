const express = require('express');
const router = express.Router();
const { getRestaurantsSortedByDistance, getRestaurantsSortedByRatings } = require('../controllers/sortController');

router.get('/distance/:categoryId', getRestaurantsSortedByDistance);
router.get('/ratings/:categoryId/:rating', getRestaurantsSortedByRatings);

module.exports = router;
