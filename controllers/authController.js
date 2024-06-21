const User = require("../model/userModel");

const register = async (req, res) => {
    console.log(req.body); // This should print the request body

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
            return res.json({
                success: false,
                message: 'User Already Exists'
            });
        }

        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user,
            message: 'Account Created Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    register
};
