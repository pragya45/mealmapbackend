const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount
} = require('../controllers/userController');
const { authGuard } = require('../middleware/authGuard');
const parser = require('../middleware/upload');

const router = express.Router();

router.get('/profile', authGuard, getUserProfile);
router.put('/profile', authGuard, parser.single('image'), updateUserProfile); // Update profile route with image upload
router.put('/profile/change-password', authGuard, changePassword);
router.delete('/profile', authGuard, deleteAccount); // Delete account route

module.exports = router;
