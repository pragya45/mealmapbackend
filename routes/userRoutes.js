const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
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
} = require('../controllers/userController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

// Get user profile
router.get('/profile', authGuard, getUserProfile);

// Update user profile
router.put('/profile', authGuard, upload.single('image'), updateUserProfile);

// Change password
router.put('/profile/change-password', authGuard, changePassword);

// Delete account
router.delete('/profile', authGuard, deleteAccount);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Render reset password page
router.get('/reset-password/:id/:token', renderResetPasswordPage);

// Set new password
router.post('/reset-password/:id/:token', setNewPassword);

// Get user by ID
router.get('/:id', authGuard, getUserById);

// Get all users (admin only)
router.get('/', authGuardAdmin, getAllUsers);

// Delete user by ID (admin only)
router.delete('/:id', authGuardAdmin, deleteUserById);

module.exports = router;
