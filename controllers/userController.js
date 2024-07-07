const User = require('../model/userModel');

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // exclude password
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
// const updateUserProfile = async (req, res) => {
//     const { fullName, email, gender, phoneNumber, location, bio } = req.body;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             req.user._id,
//             { fullName, email, gender, phoneNumber, location, bio },
//             { new: true, runValidators: true }
//         ).select('-password'); // exclude password

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             user: updatedUser
//         });
//     } catch (error) {
//         console.error('Error updating user profile:', error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming `authGuard` attaches the user to the request
        const { fullName, email, phoneNumber, gender, bio, location } = req.body;
        const image = req.file ? req.file.path : null; // Get the file path if an image is uploaded

        // Find the user by ID
        let user = await User.findById(userId);

        // Update user details
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.gender = gender || user.gender;
        user.bio = bio || user.bio;
        user.location = location || user.location;
        if (image) {
            user.image = image;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        console.log("Finding user...");
        const user = await User.findById(req.user._id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("Comparing current password...");
        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched) {
            console.log("Current password is incorrect");
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        console.log("Hashing new password...");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        console.log("Password changed successfully");
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error('Error changing password:', error.message);
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
        console.log("Finding user...");
        const user = await User.findById(req.user._id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.user._id);
        console.log("User deleted successfully");
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


module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteAccount
};
