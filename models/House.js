const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'available', // Default value if not specified
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
