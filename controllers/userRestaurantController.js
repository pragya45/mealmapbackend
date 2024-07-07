const User = require('../model/userModel');
const Restaurant = require('../model/restaurantModel');

// Save a restaurant
exports.saveRestaurant = async (req, res) => {
    try {
        const userId = req.user.id;
        const restaurantId = req.params.restaurantId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.savedRestaurants.includes(restaurantId)) {
            user.savedRestaurants.push(restaurantId);
        }

        await user.save();
        res.status(200).json({ message: 'Restaurant saved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like a restaurant
exports.likeRestaurant = async (req, res) => {
    try {
        const userId = req.user.id;
        const restaurantId = req.params.restaurantId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.likedRestaurants.includes(restaurantId)) {
            user.likedRestaurants.push(restaurantId);
        }

        await user.save();
        res.status(200).json({ message: 'Restaurant liked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get saved restaurants
exports.getSavedRestaurants = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('savedRestaurants');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.savedRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get liked restaurants
exports.getLikedRestaurants = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('likedRestaurants');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.likedRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
