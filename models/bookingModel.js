const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  houses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
