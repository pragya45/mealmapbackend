const express = require('express');
const env = require('dotenv');
const connectDB = require('./database/db');

const app = express();
env.config();

// Middleware to parse JSON
app.use(express.json());

// Connect to database
connectDB();

// Creating test route
app.get("/test", (req, res) => {
    res.status(200).json("Hello from server");
});

// Auth route
app.use('/api/user', require('./routes/authRoutes'));

// User edit delete
app.use('/api/user', require('./routes/userRoutes'));

// Restaurant routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));

// Review routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

// User restaurant routes (save and like)
app.use('/api/user-restaurants', require('./routes/userRestaurantRoutes'));

// Category routes
app.use('/api/categories', require('./routes/categoryRoutes'));

const PORT = process.env.PORT || 5000;

// Run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
