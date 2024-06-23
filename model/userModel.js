const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String
    },
    phoneNo: {
        type: String
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
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: 3600 // Token will expire in one hour
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
