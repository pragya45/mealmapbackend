const mongoose = require('mongoose');
const UserRestaurant = require('../model/userRestaurant');
const Restaurant = require('../model/restaurantModel');

// Validate MongoDB ObjectID
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Controller to get saved restaurants for a user
const getSavedRestaurants = async (req, res) => {
    try {
        const userId = req.user._id;
        const savedRestaurants = await UserRestaurant.find({ userId, isSaved: true }).populate('restaurantId');
        res.status(200).json({
            success: true,
            restaurants: savedRestaurants.map(item => item.restaurantId)
        });
    } catch (error) {
        console.error('Error fetching saved restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getLikedRestaurants = async (req, res) => {
    try {
        console.log('Request User:', req.user);
        const userId = req.user._id;
        const likedRestaurants = await UserRestaurant.find({ userId, isLiked: true }).populate('restaurantId');
        console.log('Liked Restaurants:', likedRestaurants);
        res.status(200).json({
            success: true,
            restaurants: likedRestaurants.map(item => item.restaurantId)
        });
    } catch (error) {
        console.error('Error fetching liked restaurants:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};



// Controller to save a restaurant for a user
const saveRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const userId = req.user._id;

        if (!isValidObjectId(restaurantId)) {
            return res.status(400).json({ success: false, message: 'Invalid Restaurant ID' });
        }

        let userRestaurant = await UserRestaurant.findOne({ userId, restaurantId });

        if (!userRestaurant) {
            userRestaurant = new UserRestaurant({
                userId,
                restaurantId,
                isSaved: true,
                isLiked: false
            });
        } else {
            userRestaurant.isSaved = true;
        }

        await userRestaurant.save();

        res.status(200).json({
            success: true,
            message: 'Restaurant saved successfully'
        });
    } catch (error) {
        console.error('Error saving restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Controller to like a restaurant for a user
const likeRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const userId = req.user._id;

        if (!isValidObjectId(restaurantId)) {
            return res.status(400).json({ success: false, message: 'Invalid Restaurant ID' });
        }

        let userRestaurant = await UserRestaurant.findOne({ userId, restaurantId });

        if (!userRestaurant) {
            userRestaurant = new UserRestaurant({
                userId,
                restaurantId,
                isSaved: false,
                isLiked: true
            });
        } else {
            userRestaurant.isLiked = true;
        }

        await userRestaurant.save();

        res.status(200).json({
            success: true,
            message: 'Restaurant liked successfully'
        });
    } catch (error) {
        console.error('Error liking restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Controller to remove a restaurant from saved
const unsaveRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ success: false, message: 'Invalid Restaurant ID' });
        }

        const userRestaurant = await UserRestaurant.findOne({ userId, restaurantId });

        if (userRestaurant) {
            userRestaurant.isSaved = false;
            await userRestaurant.save();
        }

        res.status(200).json({
            success: true,
            message: 'Restaurant removed from saved'
        });
    } catch (error) {
        console.error('Error unsaving restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Controller to remove a restaurant from liked
const unlikeRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.body;
        const userId = req.user._id;

        if (!isValidObjectId(restaurantId)) {
            return res.status(400).json({ success: false, message: 'Invalid Restaurant ID' });
        }

        const userRestaurant = await UserRestaurant.findOne({ userId, restaurantId });

        if (userRestaurant) {
            userRestaurant.isLiked = false;
            await userRestaurant.save();
        }

        res.status(200).json({
            success: true,
            message: 'Restaurant removed from liked'
        });
    } catch (error) {
        console.error('Error unliking restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getSavedRestaurants,
    getLikedRestaurants,
    saveRestaurant,
    likeRestaurant,
    unsaveRestaurant,
    unlikeRestaurant
};
