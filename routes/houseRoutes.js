const express = require('express');
const router = express.Router();
const {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');
const { protect, admin } = require('../middleware/authMiddleware'); // Correctly import protect and admin

// Get all houses
router.get('/', getAllHouses);

// Get house by ID
router.get('/:id', getHouseById);

// Create a new house
router.post('/', protect, admin, createHouse);

// Update house by ID
router.put('/:id', protect, admin, updateHouse);

// Delete a house by ID
router.delete('/:id', protect, admin, deleteHouse);

module.exports = router;
