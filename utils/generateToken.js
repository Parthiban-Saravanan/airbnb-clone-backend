require('dotenv').config();

const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token expires in 30 days
    });
};

module.exports = generateToken;
