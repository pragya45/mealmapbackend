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
});

module.exports = mongoose.model('UserRestaurant', userRestaurantSchema);
