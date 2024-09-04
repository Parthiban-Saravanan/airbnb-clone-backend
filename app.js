const express = require('express');
const connectDB = require('./config/db'); // this function connects to MongoDB
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const houseRoutes = require('./routes/houseRoutes'); // Import house routes
const bookingRoutes = require('./routes/bookingRoutes'); // Import booking routes
const { errorMiddleware } = require('./middleware/errorMiddleware'); // Import error handling middleware
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware for parsing JSON
app.use(express.json());

//CORS Configuration
const corsOptions = {
  origin: [
    'https://main--illustrious-crisp-77e232.netlify.app',
    'https://illustrious-crisp-77e232.netlify.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Test route to ensure server is running
app.get('/', (req, res) => {
  res.send('Server is working well!');
});

// User routes
app.use('/api/users', userRoutes);

// House routes
app.use('/api/houses', houseRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes); // this line is for booking routes

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
