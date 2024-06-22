const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const register = async (req, res) => {
    console.log(req.body);
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
    console.log(req.body);

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
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        console.log(`Provided password: ${password}`);
        console.log(`Stored hashed password: ${user.password}`);

        const isMatched = await bcrypt.compare(password, user.password);
        console.log(`Password match status: ${isMatched}`);

        if (!isMatched) {
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

module.exports = {
    register,
    login
};
