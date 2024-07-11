const mongoose = require('mongoose');

const userRestaurantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    }
});

module.exports = mongoose.model('UserRestaurant', userRestaurantSchema);
