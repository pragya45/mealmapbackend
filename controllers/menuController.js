const MenuItem = require('../model/menuModel');
const cloudinary = require('../middleware/cloudinaryConfig');

const addMenuItem = async (req, res) => {
    try {
        const { restaurantId, name, price } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const imageUrl = req.file.path;

        const newMenuItem = new MenuItem({
            restaurant: restaurantId,
            name,
            price,
            image: imageUrl
        });

        await newMenuItem.save();

        res.status(201).json({
            success: true,
            menuItem: newMenuItem
        });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getMenuItems = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menuItems = await MenuItem.find({ restaurant: restaurantId });

        res.status(200).json({
            success: true,
            menuItems
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getPopularItems = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const popularItems = await MenuItem.find({ restaurant: restaurantId }).sort({ rating: -1 }).limit(5);
        res.status(200).json({
            success: true,
            items: popularItems
        });
    } catch (error) {
        console.error('Error fetching popular items:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addMenuItem,
    getMenuItems,
    getPopularItems
};
