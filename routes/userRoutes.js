const express = require('express');
const { signup, login, logout } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes and associate them with controller functions
router.post('/signup', signup); // Route to signup a new user
router.post('/login', login); // Route to log in a user
router.post('/logout', protect, logout); // Route to log out a user

module.exports = router;
