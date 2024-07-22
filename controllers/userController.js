// const bcrypt = require('bcryptjs');
// const User = require('../model/userModel');

// // Get User Profile
// const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select('-password'); // Exclude password
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             user // Ensure the user object is returned here
//         });
//     } catch (error) {
//         console.error('Error fetching user profile:', error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

// const updateUserProfile = async (req, res) => {
//     try {
//         const userId = req.user._id; // Assuming `authGuard` attaches the user to the request
//         const { fullName, email, phoneNumber, gender, bio, location } = req.body;
//         const image = req.file ? req.file.path : null; // Get the file path if an image is uploaded

//         // Find the user by ID
//         let user = await User.findById(userId);

//         // Update user details
//         user.fullName = fullName || user.fullName;
//         user.email = email || user.email;
//         user.phoneNumber = phoneNumber || user.phoneNumber;
//         user.gender = gender || user.gender;
//         user.bio = bio || user.bio;
//         user.location = location || user.location;
//         if (image) {
//             user.image = image;
//         }

//         // Save the updated user
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: 'Profile updated successfully',
//             user,
//         });
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message,
//         });
//     }
// };

// //change-password
// const changePassword = async (req, res) => {
//     const { currentPassword, newPassword } = req.body;

//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const isMatched = await bcrypt.compare(currentPassword, user.password);
//         if (!isMatched) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Current password is incorrect"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Password changed successfully"
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };


// // Delete Account
// const deleteAccount = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         await User.findByIdAndDelete(req.user._id);
//         res.status(200).json({
//             success: true,
//             message: "Account deleted successfully"
//         });
//     } catch (error) {
//         console.error('Error deleting account:', error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     getUserProfile,
//     updateUserProfile,
//     changePassword,
//     deleteAccount
// };

const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const { email, fullName, gender, phoneNumber, location, bio } = req.body;
        const userId = req.user._id;

        // Check if the email is already in use by another user
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }

        const updateData = { fullName, gender, phoneNumber, location, bio };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value entered',
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// Change password controller
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// Delete Account
const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting account:', error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Please enter email',
        });
    }

    try {
        // Log the email
        console.log('Email:', email);

        const user = await User.findOne({ email }).exec();
        // Log the user
        console.log('User:', user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist',
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET + user.password, { expiresIn: '10m' });
        const resetPasswordExpires = Date.now() + 600000; // 10 minutes

        // Use updateOne to directly update the specific fields
        await User.updateOne(
            { _id: user._id },
            { resetPasswordToken: token, resetPasswordExpires: resetPasswordExpires }
        );

        const link = `http://localhost:5000/api/user/reset-password/${user._id}/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Link',
            text: `Click the following link to reset your password: ${link}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ success: false, message: error.message });
            }
            res.status(200).json({
                success: true,
                message: 'Password reset link sent successfully',
            });
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};



// Render reset password page
const renderResetPasswordPage = async (req, res) => {
    const { id, token } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const secret = process.env.JWT_SECRET + user.password;

        // Check if the token matches and is not expired
        if (user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires) {
            return res.status(400).json({ success: false, message: 'Password reset link is invalid or has expired' });
        }

        jwt.verify(token, secret);

        res.render('index', { email: user.email, id, token });
    } catch (error) {
        console.error('Error rendering reset password page:', error);
        res.status(500).json({ success: false, message: 'Password reset link is invalid or has expired' });
    }
};

const setNewPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    console.log('Request body:', req.body); // Log the request body to check if the data is being received

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const secret = process.env.JWT_SECRET + user.password;
        jwt.verify(token, secret);

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Use updateOne to directly update the password field
        await User.updateOne(
            { _id: id },
            {
                password: encryptedPassword,
                resetPasswordToken: undefined,
                resetPasswordExpires: undefined
            }
        );

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error setting new password:', error);
        res.status(500).json({ success: false, message: 'Error setting new password' });
    }
};

// Add this function to fetch user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteAccount,
    forgotPassword,
    renderResetPasswordPage,
    setNewPassword,
    getUserById,
    getAllUsers,
    deleteUserById
};
