const Restaurant = require('../model/restaurantModel');
const cloudinary = require('../middleware/cloudinaryConfig');

const addRestaurant = async (req, res) => {
    try {
        const { name, category, description, rating, isFeatured, place } = req.body;

        console.log('Request Body:', req.body); // Log the request body
        console.log('File:', req.file); // Log the file

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const imageUrl = req.file.path;

        const newRestaurant = new Restaurant({
            name,
            category,
            description,
            rating,
            isFeatured,
            image: imageUrl,
            place
        });

        await newRestaurant.save();

        res.status(201).json({
            success: true,
            restaurant: newRestaurant
        });
    } catch (error) {
        console.error('Error adding restaurant:', error); // Log the error
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const { name, category, description, rating, isFeatured, place } = req.body;

        const updatedData = {
            name,
            category,
            description,
            rating,
            isFeatured,
            place
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            updatedData,
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
        console.error('Error updating restaurant:', error);
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
        console.error('Error deleting restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


const searchRestaurants = async (req, res) => {
    try {
        const query = req.query.query;
        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
        const restaurants = await Restaurant.find({ name: { $regex: regex } }).populate('category', 'name');
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

// Fetch all restaurants
const getRestaurants = async (req, res) => {
    try {
        const query = req.query.query || '';
        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive search
        const restaurants = await Restaurant.find({ name: { $regex: regex } }).populate('category', 'name');

        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('category', 'name');

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
        console.error('Error fetching restaurant by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

//
const getFeaturedRestaurants = async (req, res) => {
    try {
        const featuredRestaurants = await Restaurant.find({ isFeatured: true }).populate('category', 'name');
        res.status(200).json({
            success: true,
            restaurants: featuredRestaurants
        });
    } catch (error) {
        console.error('Error fetching featured restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    getRestaurants,
    getRestaurantById,
    getFeaturedRestaurants
};
