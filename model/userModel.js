const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    bio: {
        type: String,
        required: false,
    },
    phoneNo: {
        type: String,
        required: false,
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
    ]
});

// Encrypting passwords 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Comparing password 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600 // Token will expire in one hour
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
