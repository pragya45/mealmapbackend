const Restaurant = require('../model/restaurantModel');

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('reviews.user', 'fullName');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const addRestaurant = async (req, res) => {
    try {
        const newRestaurant = new Restaurant(req.body);
        await newRestaurant.save();
        res.status(201).json({
            success: true,
            restaurant: newRestaurant
        });
    } catch (error) {
        console.error('Error adding restaurant:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getRestaurants,
    getRestaurantById,
    addRestaurant
};
