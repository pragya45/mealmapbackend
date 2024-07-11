const Restaurant = require('../model/restaurantModel');

// Fetch restaurants sorted by distance within a category
const getRestaurantsSortedByDistance = async (req, res) => {
    try {
        const { categoryId } = req.params;
        // Assuming the 'distance' field exists in the schema or is calculated dynamically
        const restaurants = await Restaurant.find({ category: categoryId }).sort({ distance: 1 });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch restaurants sorted by ratings within a category
const getRestaurantsSortedByRatings = async (req, res) => {
    try {
        const { categoryId, rating } = req.params;
        const restaurants = await Restaurant.find({ category: categoryId, rating: { $gte: rating } }).sort({ rating: -1 });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRestaurantsSortedByDistance,
    getRestaurantsSortedByRatings,
};
