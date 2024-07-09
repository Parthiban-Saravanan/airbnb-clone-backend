const asyncHandler = require('express-async-handler');
const House = require('../models/House');

// @desc    Get all houses
// @route   GET /api/houses
// @access  Public
const getAllHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();
  res.json(houses);
});

// @desc    Create a new house
// @route   POST /api/houses
// @access  Private
const createHouse = asyncHandler(async (req, res) => {
  const { type, location, price, rating, status, imageUrl } = req.body;

  const house = new House({
    type,
    location,
    price,
    rating,
    status,
    imageUrl,
  });

  const createdHouse = await house.save();
  res.status(201).json(createdHouse);
});

// @desc    Update a house
// @route   PUT /api/houses/:id
// @access  Private
const updateHouse = asyncHandler(async (req, res) => {
  const { type, location, price, rating, status, imageUrl } = req.body;

  const house = await House.findById(req.params.id);

  if (house) {
    house.type = type;
    house.location = location;
    house.price = price;
    house.rating = rating;
    house.status = status;
    house.imageUrl = imageUrl;

    const updatedHouse = await house.save();
    res.json(updatedHouse);
  } else {
    res.status(404);
    throw new Error('House not found');
  }
});

// @desc    Delete a house
// @route   DELETE /api/houses/:id
// @access  Private
const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house) {
    await house.remove();
    res.json({ message: 'House removed' });
  } else {
    res.status(404);
    throw new Error('House not found');
  }
});

module.exports = {
  getAllHouses,
  createHouse,
  updateHouse,
  deleteHouse,
};
