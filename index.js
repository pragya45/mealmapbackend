// Importing
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

// user auth route
app.use('/api/user', require('./routes/userRoutes'));

// restaurant routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));

// review routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

//featured restaurant routes
app.use('/api/featured', require('./routes/featuredRoutes'));

const PORT = process.env.PORT || 5000;

// Run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
