const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/signup', registerUser);
router.post('/login', authUser);

// Private Route (Protected with token)
router.get('/profile', protect, getUserProfile);

module.exports = router;
