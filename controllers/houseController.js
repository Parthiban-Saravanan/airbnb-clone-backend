const asyncHandler = require('express-async-handler');
const House = require('../models/House'); // Import your House model

// Get all houses
const getAllHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();
  res.json(houses);
});

// Get house by ID
const getHouseById = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);
  if (!house) {
    res.status(404).json({ message: 'House not found' });
    return;
  }
  res.json(house);
});

// Create a new house
const createHouse = asyncHandler(async (req, res) => {
  const newHouse = new House(req.body);
  const savedHouse = await newHouse.save();
  res.status(201).json(savedHouse);
});

// Update a house
const updateHouse = asyncHandler(async (req, res) => {
  const house = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!house) {
    res.status(404).json({ message: 'House not found' });
    return;
  }
  res.json(house);
});

// Delete a house
const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findByIdAndDelete(req.params.id);
  if (!house) {
    res.status(404).json({ message: 'House not found' });
    return;
  }
  res.json({ message: 'House deleted' });
});

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse
};
