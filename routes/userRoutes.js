// const express = require('express');
// const { getUserProfile, updateUserProfile, changePassword, deleteAccount } = require('../controllers/userController');
// const { authGuard } = require('../middleware/authGuard');
// const parser = require('../middleware/cloudinaryConfig');

// const router = express.Router();

// router.get('/profile', authGuard, getUserProfile);
// router.put('/profile/change-password', authGuard, changePassword);
// router.delete('/profile', authGuard, deleteAccount); // Delete account route

// module.exports = router;




const express = require('express');
const { getUserProfile, updateUserProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { authGuard } = require('../middleware/authGuard');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/profile', authGuard, getUserProfile);
router.put('/profile', authGuard, upload.single('image'), updateUserProfile); // Update profile route with image upload
router.put('/profile/change-password', authGuard, changePassword);
router.delete('/profile', authGuard, deleteAccount); // Delete account route

module.exports = router;
