const express = require('express');
const {
    getRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants,
    getFeaturedRestaurants
} = require('../controllers/restaurantController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getRestaurants);
router.get('/search', searchRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', authGuardAdmin, upload.single('image'), addRestaurant);
router.put('/:id', authGuardAdmin, upload.single('image'), updateRestaurant);
router.delete('/:id', authGuardAdmin, deleteRestaurant);
router.get('/featured', getFeaturedRestaurants);

module.exports = router;
