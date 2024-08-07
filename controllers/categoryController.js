const Category = require('../model/categoryModel');

const getCategories = async (req, res) => {
    try {
        let categories;
        if (req.query.query) {
            const regex = new RegExp(req.query.query, 'i'); // 'i' for case-insensitive
            categories = await Category.find({ name: { $regex: regex } });
        } else {
            categories = await Category.find();
        }
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        console.log('Fetching category by ID:', categoryId);
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Error fetching category by ID:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({
            success: true,
            category: newCategory
        });
    } catch (error) {
        console.error('Error adding category:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const searchCategories = async (req, res) => {
    try {
        const query = req.query.query;
        const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
        const categories = await Category.find({ name: { $regex: regex } });
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Error searching categories:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    searchCategories
};
