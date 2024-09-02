const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Ensure the correct import

// Route for user registration
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for fetching user profile, protected by authMiddleware
router.get('/profile', protect, getUserProfile); // Ensure protect is used as middleware

module.exports = router;
