const express = require('express');
const {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    searchCategories
} = require('../controllers/categoryController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authGuardAdmin, addCategory);
router.put('/:id', authGuardAdmin, updateCategory);
router.delete('/:id', authGuardAdmin, deleteCategory);
router.get('/search', searchCategories);

module.exports = router;
