// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// // Configure cloudinary with your credentials
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Create a storage object with Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'mealmap/restaurants', // Specify the folder in Cloudinary
//         format: async (req, file) => 'png', // supports promises as well
//         public_id: (req, file) => file.originalname.split('.')[0], // Use the original file name as the public ID
//     },
// });

// // Initialize multer with Cloudinary storage
// const parser = multer({ storage: storage });

// module.exports = parser;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create a storage object with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mealmap/profile_pictures', // Specify the folder in Cloudinary
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0], // Use the original file name as the public ID
    },
});

// Initialize multer with Cloudinary storage
const parser = multer({ storage: storage });

module.exports = parser;
