const asyncHandler = require('express-async-handler');
const Booking = require('../models/bookingModel');
const House = require('../models/House');

// Create booking (ensure authentication middleware is applied in routes)
exports.createBooking = asyncHandler(async (req, res) => {
  const { houses, totalPrice } = req.body;
  const userId = req.user._id;

  if (!houses || houses.length === 0) {
    return res.status(400).json({ message: 'No houses provided for booking' });
  }

  const booking = new Booking({
    user: userId,
    houses,
    totalPrice
  });

  await booking.save();
  res.status(201).json({ success: true, data: booking });
});

// Confirm booking (house status validation and update)
exports.confirmBooking = asyncHandler(async (req, res) => {
  const { houses, totalPrice } = req.body;
  const houseIds = houses.map(house => house._id);

  const foundHouses = await House.find({ _id: { $in: houseIds }, status: 'available' });

  if (foundHouses.length !== houseIds.length) {
    return res.status(400).json({ message: 'Some houses are not available for booking' });
  }

  const booking = new Booking({
    user: req.user._id,
    houses: houseIds,
    totalPrice,
  });

  await booking.save();
  await House.updateMany({ _id: { $in: houseIds } }, { status: 'booked' });

  res.status(201).json({ success: true, data: booking });
});
