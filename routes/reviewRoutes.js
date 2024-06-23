const express = require('express');
const { addReview, getReviewsForRestaurant } = require('../controllers/reviewController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/', authGuard, addReview); // Users can add reviews
router.get('/:restaurantId', getReviewsForRestaurant); // Both users and admins can view reviews

module.exports = router;
