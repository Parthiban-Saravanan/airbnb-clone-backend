const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('Server is working well!');
});

// Middleware
app.use(express.json());

// CORS middleware
app.use(cors({
    origin: 'https://illustrious-crisp-77e232.netlify.app/'
  }));
  

// Routes
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
