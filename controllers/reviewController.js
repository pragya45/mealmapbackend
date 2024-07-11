const Review = require('../model/reviewModel');
const Restaurant = require('../model/restaurantModel');

const addReview = async (req, res) => {
    try {
        const { restaurantId, rating, comment } = req.body;
        const userId = req.user._id; // Ensure req.user._id is being correctly populated

        const newReview = new Review({
            user: userId,
            restaurant: restaurantId,
            rating,
            comment
        });

        await newReview.save();

        // Update the restaurant's reviews array
        const restaurant = await Restaurant.findById(restaurantId);
        restaurant.reviews.push(newReview._id);
        await restaurant.save();

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


const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or you are not authorized to delete this review',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};



module.exports = {
    addReview,
    getReviews,
    deleteReview
};
