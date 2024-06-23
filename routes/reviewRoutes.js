const express = require('express');
const { addReview, getReviewsByRestaurantId } = require('../controllers/reviewController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/', authGuard, addReview);
router.get('/:restaurantId', getReviewsByRestaurantId);

module.exports = router;
