// const mongoose = require('mongoose');

// const restaurantSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: false,
//         default: 0,
//     },
//     reviews: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Review',
//         },
//     ],
//     isFeatured: {
//         type: Boolean,
//         default: false,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     place: {
//         type: String,
//         required: true,
//     }
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// module.exports = Restaurant;


const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    opening_time: {
        type: String,
        required: false,
    },
    closing_time: {
        type: String,
        required: false,
    },
    distance: { // Add this if you plan to sort by distance
        type: Number,
        required: false,
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
