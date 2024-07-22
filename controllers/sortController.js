const mongoose = require('mongoose');
const Restaurant = require('../model/restaurantModel');

// Fetch restaurants sorted by distance within a category
const getRestaurantsSortedByDistance = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { latitude, longitude, order = 'asc' } = req.query;

        console.log(`Filtering by distance: latitude=${latitude}, longitude=${longitude}, order=${order}`);

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and Longitude are required' });
        }

        const sortOrder = order === 'desc' ? -1 : 1;

        const restaurants = await Restaurant.find({
            category: new mongoose.Types.ObjectId(categoryId),
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    $maxDistance: 10000 // Adjust this distance as needed
                }
            }
        }).sort({ 'location.coordinates': sortOrder });

        console.log(`Found restaurants: ${restaurants.length}`);
        res.json({ restaurants });
    } catch (error) {
        console.error('Error fetching restaurants by distance:', error);
        res.status(500).json({ error: error.message });
    }
};

// Fetch restaurants sorted by ratings within a category
const getRestaurantsSortedByRatings = async (req, res) => {
    try {
        const { categoryId, rating } = req.params;
        const restaurants = await Restaurant.find({
            category: new mongoose.Types.ObjectId(categoryId),
            rating: { $gte: rating }
        }).sort({ rating: -1 });

        console.log(`Found restaurants by rating: ${restaurants.length}`);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRestaurantsSortedByDistance,
    getRestaurantsSortedByRatings,
};
