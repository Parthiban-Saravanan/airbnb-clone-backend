const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
const connectToDatabase = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
connectToDatabase();

// Middleware for parsing JSON
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Localhost for development
  'https://tranquil-cocada-ac3cf1.netlify.app' // Deployed frontend on Netlify
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); // Log blocked origin for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies, authorization headers, etc.
};

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
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use(errorMiddleware); // Fixed middleware usage

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
