const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/', authGuard, addReview);
router.get('/:restaurantId', getReviews);

module.exports = router;
