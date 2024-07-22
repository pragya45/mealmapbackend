const express = require('express');
const { addReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/', authGuard, addReview);
router.get('/:restaurantId', getReviews);
router.delete('/:reviewId', authGuard, deleteReview);

module.exports = router;
