const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        console.log(password);

        const user = await User.create({ fullName, email, password });
        res.status(201).json({
            success: true,
            user,
            message: 'Account created successfully'
        });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields."
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Log the password and hashed password for debugging
        console.log('Provided password:', password);
        console.log('Stored hashed password:', user.password);

        const isMatched = bcrypt.compareSync(password, user.password);
        if (!isMatched) {
            console.log('Password does not match');
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            userData: user
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const refreshToken = async (req, res) => {
    const oldToken = req.body.token;

    if (!oldToken) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(500).json({ message: "Failed to refresh token", error: error.message });
    }
};

module.exports = {
    register,
    login,
    refreshToken
};
