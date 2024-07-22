const express = require('express');
const {
    getRestaurants,  // Add this line
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    getFeaturedRestaurants,
    searchRestaurantsByCategory,
    getRestaurantsByCategory
} = require('../controllers/restaurantController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getRestaurants); // Add this line
router.get('/featured', getFeaturedRestaurants);
router.get('/search', searchRestaurants);
router.get('/by-category', getRestaurantsByCategory);
router.get('/by-category/search', searchRestaurantsByCategory);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, upload.single('image'), addRestaurant);
router.put('/:id', authGuardAdmin, upload.single('image'), updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);


module.exports = router;