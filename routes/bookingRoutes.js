const express = require('express');
const bookingRouter = express.Router();
const { createBooking, confirmBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Route to create a new booking
bookingRouter.post('/', protect, createBooking);

// Route to confirm booking
bookingRouter.post('/confirm', protect, confirmBooking);

module.exports = bookingRouter;
