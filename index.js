const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const connectDB = require('./database/db');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
env.config();

// Middleware to parse JSON
app.use(express.json());

// Middleware to parse URL-encoded data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Creating test route
app.get("/test", (req, res) => {
    res.status(200).json("Hello from server");
});

// Auth route
app.use('/api/auth', require('./routes/authRoutes'));

// User edit delete
app.use('/api/user', require('./routes/userRoutes'));

// Restaurant routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));

// Review routes
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Menu
app.use('/api/menu', require('./routes/menuRoutes'));

// User restaurant routes (save and like)
app.use('/api/user-restaurants', require('./routes/userRestaurantRoutes'));

// Category routes
app.use('/api/categories', require('./routes/categoryRoutes'));

// Sort routes
app.use('/api/sort', require('./routes/sortRoutes'));

const PORT = process.env.PORT || 5000;

// Run the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
