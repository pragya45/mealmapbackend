const Review = require('../model/reviewModel');
const Restaurant = require('../model/restaurantModel');

const addReview = async (req, res) => {
    const { restaurantId, rating, comment } = req.body;
    const userId = req.user._id; // Assuming req.user is populated by the auth middleware

    try {
        const newReview = new Review({
            user: userId,
            restaurant: restaurantId,
            rating,
            comment
        });

        const savedReview = await newReview.save();

        // Optionally update restaurant's average rating
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        restaurant.reviews.push(savedReview._id);
        await restaurant.save();

        res.status(201).json({
            success: true,
            review: savedReview
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

const getReviewsForRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate('user', 'fullName');
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
    getReviewsForRestaurant
};
