const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Private Route (Protected with token)
router.get('/profile', protect, getUserProfile);

module.exports = router;
