const mongoose = require('mongoose');
const Restaurant = require('../model/restaurantModel');

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('category', 'name');
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
    const restaurantId = req.params.id;
    console.log('Fetching restaurant with ID:', restaurantId); // Add this line for logging

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid restaurant ID'
        });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId).populate('reviews.user', 'fullName');
        if (!restaurant) {
            console.log('Restaurant not found:', restaurantId); // Add this line for logging
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

const filterRestaurantsByCategory = async (req, res) => {
    const { categoryId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid category ID',
        });
    }

    try {
        const restaurants = await Restaurant.find({ category: categoryId }).populate('category', 'name');
        res.status(200).json({
            success: true,
            restaurants,
        });
    } catch (error) {
        console.error('Error filtering restaurants by category:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};


const addRestaurant = async (req, res) => {
    try {
        const { name, category, location, description, rating } = req.body;

        // Validate the category ID
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID'
            });
        }

        const newRestaurant = new Restaurant({ name, category, location, description, rating });
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

const updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            success: true,
            restaurant: updatedRestaurant
        });
    } catch (error) {
        console.error('Error updating restaurant:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting restaurant:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const searchRestaurants = async (req, res) => {
    const query = req.query.query;
    try {
        const restaurants = await Restaurant.find({
            name: { $regex: query, $options: 'i' }  // Case-insensitive search
        });
        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        console.error('Error searching restaurants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Filter restaurants by distance
const filterRestaurantsByDistance = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            success: false,
            message: 'Latitude and longitude are required'
        });
    }

    try {
        const restaurants = await Restaurant.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lon), parseFloat(lat)]
                    },
                    $maxDistance: 5000 // Example: 5 km radius
                }
            }
        }).populate('category', 'name');

        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        console.error('Error filtering restaurants by distance:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Filter restaurants by rating
const filterRestaurantsByRating = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().sort({ rating: -1 }).populate('category', 'name');

        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        console.error('Error filtering restaurants by rating:', error.message);
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
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    filterRestaurantsByCategory,
    filterRestaurantsByDistance,
    filterRestaurantsByRating
};
