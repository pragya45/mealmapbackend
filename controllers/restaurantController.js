// const mongoose = require('mongoose');
// const Restaurant = require('../model/restaurantModel');
// const Category = require('../model/categoryModel');

// const getRestaurants = async (req, res) => {
//     try {
//         const restaurants = await Restaurant.find().populate('category', 'name');
//         res.status(200).json({
//             success: true,
//             restaurants
//         });
//     } catch (error) {
//         console.error('Error fetching restaurants:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// const getRestaurantById = async (req, res) => {
//     const restaurantId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid restaurant ID'
//         });
//     }

//     try {
//         const restaurant = await Restaurant.findById(restaurantId).populate('reviews.user', 'fullName');
//         if (!restaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Restaurant not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             restaurant
//         });
//     } catch (error) {
//         console.error('Error fetching restaurant by ID:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// const filterRestaurantsByCategory = async (req, res) => {
//     const { categoryId } = req.query;

//     console.log('Received categoryId:', categoryId);  // Logging the received categoryId

//     // Validate ObjectId for categoryId
//     if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//         console.log('Invalid category ID:', categoryId);  // Logging invalid categoryId
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid category ID',
//         });
//     }

//     try {
//         const restaurants = await Restaurant.find({ category: categoryId }).populate('category', 'name');
//         console.log('Found restaurants:', restaurants);  // Logging the found restaurants
//         res.status(200).json({
//             success: true,
//             restaurants,
//         });
//     } catch (error) {
//         console.error('Error filtering restaurants by category:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message,
//         });
//     }
// };



// const addRestaurant = async (req, res) => {
//     try {
//         const { name, category, location, description, rating } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(category)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid category ID'
//             });
//         }

//         const newRestaurant = new Restaurant({ name, category, location, description, rating });
//         await newRestaurant.save();
//         res.status(201).json({
//             success: true,
//             restaurant: newRestaurant
//         });
//     } catch (error) {
//         console.error('Error adding restaurant:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// const updateRestaurant = async (req, res) => {
//     try {
//         const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedRestaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Restaurant not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             restaurant: updatedRestaurant
//         });
//     } catch (error) {
//         console.error('Error updating restaurant:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// const deleteRestaurant = async (req, res) => {
//     try {
//         const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
//         if (!deletedRestaurant) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Restaurant not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Restaurant deleted successfully'
//         });
//     } catch (error) {
//         console.error('Error deleting restaurant:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// const searchRestaurants = async (req, res) => {
//     const query = req.query.query;
//     try {
//         const restaurants = await Restaurant.find({
//             name: { $regex: query, $options: 'i' }
//         }).populate('category', 'name');
//         res.status(200).json({
//             success: true,
//             restaurants
//         });
//     } catch (error) {
//         console.error('Error searching restaurants:', error.message);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     getRestaurants,
//     getRestaurantById,
//     addRestaurant,
//     updateRestaurant,
//     deleteRestaurant,
//     searchRestaurants,
//     filterRestaurantsByCategory
// };
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

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid restaurant ID'
        });
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId).populate('reviews.user', 'fullName');
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

const filterRestaurantsByCategory = async (req, res) => {
    const { categoryId } = req.query;

    console.log('Received categoryId:', categoryId);  // Add this line for logging

    // Validate ObjectId for categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        console.log('Invalid category ID:', categoryId);  // Add this line for logging
        return res.status(400).json({
            success: false,
            message: 'Invalid category ID',
        });
    }

    try {
        const restaurants = await Restaurant.find({ category: categoryId }).populate('category', 'name');
        console.log('Found restaurants:', restaurants);  // Add this line for logging
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

module.exports = {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    filterRestaurantsByCategory
};
