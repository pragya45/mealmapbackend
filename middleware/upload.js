const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'mealmap/restaurants',
        format: async (req, file) => 'png',
        public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
    },
});

const parser = multer({ storage: storage });

module.exports = parser;
