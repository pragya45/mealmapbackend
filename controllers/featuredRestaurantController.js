const Restaurant = require('../model/restaurantModel');

const getFeaturedRestaurants = async (req, res) => {
    try {
        const featuredRestaurants = await Restaurant.find({ isFeatured: true });
        res.status(200).json({
            success: true,
            featuredRestaurants
        });
    } catch (error) {
        console.error('Error fetching featured restaurants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getFeaturedRestaurants
};
