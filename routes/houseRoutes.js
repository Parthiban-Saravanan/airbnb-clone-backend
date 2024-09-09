const express = require('express');
const router = express.Router();
const {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse
} = require('../controllers/houseController'); // Adjust path as needed

// Define routes
router.get('/', getAllHouses); // Get all houses
router.get('/:id', getHouseById); // Get house by ID
router.post('/', createHouse); // Create a new house
router.put('/:id', updateHouse); // Update a house
router.delete('/:id', deleteHouse); // Delete a house

module.exports = router;
