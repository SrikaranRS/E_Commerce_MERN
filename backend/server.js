const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Dynamic CORS middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    // Add any other allowed origins here
];

const corsOptions = (req, callback) => {
    const origin = req.header('Origin');
    if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, { origin: true, credentials: true }); // Allow the origin and credentials
    } else {
        callback(null, { origin: false }); // Disallow the origin
    }
};

// Use CORS middleware with dynamic options
app.use(cors(corsOptions));

// Importing routes and middleware
const errorMiddleware = require('./middlewares/error');
const connectDatabase = require('./config/database');
const productRoute = require('./routes/productRoutes');
const authRoute = require('./routes/authRoutes');
const orderRoute = require('./routes/orderRoutes');

// Connect to the database
connectDatabase();

// Set up routes
app.use('/api/v1', productRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/order', orderRoute);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    process.exit(1);
});
