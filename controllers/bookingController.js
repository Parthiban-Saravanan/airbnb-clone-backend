const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const House = require('../models/House');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res) => {
  try {
    const { houses, totalPrice } = req.body;
    const userId = req.user._id; // Assume user is authenticated and user ID is attached to req

    const booking = new Booking({
      user: userId,
      houses,
      totalPrice
    });

    await booking.save();

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @desc    Confirm booking
// @route   POST /api/bookings/confirm
// @access  Private
exports.confirmBooking = asyncHandler(async (req, res) => {
  const { houses, totalPrice } = req.body;

  // Validate if houses exist
  const houseIds = houses.map(house => house._id);
  const foundHouses = await House.find({ _id: { $in: houseIds } });

  if (foundHouses.length !== houseIds.length) {
    res.status(400);
    throw new Error('One or more houses not found');
  }

  // Create new booking
  const booking = new Booking({
    user: req.user._id,
    houses: houseIds,
    totalPrice,
  });

  const savedBooking = await booking.save();

  // Update house status to 'booked' for each booked house
  await House.updateMany(
    { _id: { $in: houseIds } },
    { status: 'booked' }
  );

  res.status(201).json({ success: true, data: savedBooking });
});
