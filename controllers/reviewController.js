const Review = require('../model/reviewModel');

const addReview = async (req, res) => {
    try {
        const { restaurantId, rating, comment } = req.body;
        const userId = req.user._id;

        const newReview = new Review({
            user: userId,
            restaurant: restaurantId,
            rating,
            comment
        });

        await newReview.save();

        res.status(201).json({
            success: true,
            review: newReview
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'fullName');

        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviews
};
