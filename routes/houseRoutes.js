const express = require('express');
const houseRouter = express.Router();
const {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse
} = require('../controllers/houseController');

// Define routes
houseRouter.get('/', getAllHouses); // Get all houses
houseRouter.get('/:id', getHouseById); // Get house by ID
houseRouter.post('/', createHouse); // Create a new house
houseRouter.put('/:id', updateHouse); // Update a house
houseRouter.delete('/:id', deleteHouse); // Delete a house

module.exports = houseRouter;
