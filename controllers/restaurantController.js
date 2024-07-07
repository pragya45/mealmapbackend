const mongoose = require('mongoose');
const Restaurant = require('../model/restaurantModel');
const parser = require('../middleware/cloudinaryConfig');

const addRestaurant = async (req, res) => {
    try {
        const { name, category, description, rating, isFeatured, place } = req.body;

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID',
            });
        }

        const featured = req.user.isAdmin ? isFeatured === 'true' : false;

        const newRestaurant = new Restaurant({
            name,
            category,
            description,
            rating: parseFloat(rating),
            isFeatured: featured,
            image: req.file.path,
            place, // Ensure place is included here
        });

        await newRestaurant.save();
        res.status(201).json({
            success: true,
            restaurant: newRestaurant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const getFeaturedRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isFeatured: true }).select('name image place');
        console.log('Fetched featured restaurants:', restaurants); // Log the fetched data
        res.status(200).json({
            success: true,
            restaurants,
        });
    } catch (error) {
        console.error('Error fetching featured restaurants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};


const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            success: true,
            restaurants,
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

//search 
const searchRestaurants = async (req, res) => {
    try {
        const query = req.query.q;
        const restaurants = await Restaurant.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { place: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get restaurant details by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('category reviews');
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.status(200).json({ success: true, restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    addRestaurant,
    getFeaturedRestaurants,
    getRestaurants,
    searchRestaurants,
    getRestaurantById
};
