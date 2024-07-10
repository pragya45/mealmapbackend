const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    savedRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ],
    likedRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ],
    gender: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
