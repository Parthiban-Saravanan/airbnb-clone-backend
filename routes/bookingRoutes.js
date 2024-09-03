const express = require('express');
const { createBooking, confirmBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new booking
router.post('/', protect, createBooking);

// Route to confirm booking
router.post('/confirm', protect, confirmBooking);

module.exports = router;
