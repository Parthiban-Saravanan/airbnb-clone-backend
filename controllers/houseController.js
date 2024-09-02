const asyncHandler = require('express-async-handler');
const House = require('../models/House');

// @desc    Get all houses
// @route   GET /api/houses
// @access  Public
const getAllHouses = asyncHandler(async (req, res) => {
  const houses = await House.find({});
  res.status(200).json({ success: true, data: houses });
});

// @desc    Get house by ID
// @route   GET /api/houses/:id
// @access  Public
const getHouseById = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house) {
    res.json(house);
  } else {
    res.status(404);
    throw new Error('House not found');
  }
});

// @desc    Create a new house
// @route   POST /api/houses
// @access  Private/Admin
const createHouse = asyncHandler(async (req, res) => {
  const { title, description, price, image, location } = req.body;

  const house = await House.create({
    title,
    description,
    price,
    image,
    location,
  });

  if (house) {
    res.status(201).json(house);
  } else {
    res.status(400);
    throw new Error('Invalid house data');
  }
});

// @desc    Update house by ID
// @route   PUT /api/houses/:id
// @access  Private/Admin
const updateHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house) {
    house.title = req.body.title || house.title;
    house.description = req.body.description || house.description;
    house.price = req.body.price || house.price;
    house.image = req.body.image || house.image;
    house.location = req.body.location || house.location;

    const updatedHouse = await house.save();

    res.json(updatedHouse);
  } else {
    res.status(404);
    throw new Error('House not found');
  }
});

// @desc    Delete a house by ID
// @route   DELETE /api/houses/:id
// @access  Private/Admin
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
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
};
