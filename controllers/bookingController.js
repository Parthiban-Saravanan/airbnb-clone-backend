const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
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
};
