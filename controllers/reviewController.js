const mongoose = require('mongoose');
const Review = require('../model/reviewModel');
const Restaurant = require('../model/restaurantModel');

const addReview = async (req, res) => {
    const { rating, comment, restaurantId } = req.body;
    const userId = req.user._id;

    try {
        // Validate restaurant ID
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid restaurant ID'
            });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        const newReview = new Review({
            rating,
            comment,
            user: userId,
            restaurant: restaurantId,
        });

        await newReview.save();

        // Add the review to the restaurant's reviews array
        restaurant.reviews.push(newReview._id);
        await restaurant.save();

        res.status(201).json({
            success: true,
            review: newReview,
            message: 'Review added successfully'
        });
    } catch (error) {
        console.error('Error adding review:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getReviewsByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;

    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid restaurant ID'
        });
    }

    try {
        const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'fullName');
        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviewsByRestaurantId
};
