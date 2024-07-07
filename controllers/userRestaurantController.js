const User = require('../model/userModel');
const Restaurant = require('../model/restaurantModel');

const saveRestaurant = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }

        if (!user.savedRestaurants.includes(req.params.restaurantId)) {
            user.savedRestaurants.push(req.params.restaurantId);
            await user.save();
        }

        res.status(200).json({ success: true, message: 'Restaurant saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const likeRestaurant = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }

        if (!user.likedRestaurants.includes(req.params.restaurantId)) {
            user.likedRestaurants.push(req.params.restaurantId);
            await user.save();
        }

        res.status(200).json({ success: true, message: 'Restaurant liked successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

const getSavedRestaurants = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedRestaurants');
        res.status(200).json({ success: true, savedRestaurants: user.savedRestaurants });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


const getLikedRestaurants = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('likedRestaurants');
        const likedRestaurants = user.likedRestaurants.map(restaurant => ({
            _id: restaurant._id,
            name: restaurant.name,
            category: restaurant.category,
            description: restaurant.description,
            rating: restaurant.rating,
            reviews: restaurant.reviews,
            isFeatured: restaurant.isFeatured,
            image: restaurant.image,
            location: restaurant.location // Ensure location is included
        }));

        res.status(200).json({ success: true, likedRestaurants });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    saveRestaurant,
    likeRestaurant,
    getSavedRestaurants,
    getLikedRestaurants
};
