const express = require('express');
const router = express.Router();
const {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');
const { protect, admin } = require('../middleware/authMiddleware');

// Logging to ensure functions are imported correctly
console.log('getAllHouses:', getAllHouses);
console.log('getHouseById:', getHouseById);
console.log('createHouse:', createHouse);
console.log('updateHouse:', updateHouse);
console.log('deleteHouse:', deleteHouse);

// Routes for house management
router.get('/', getAllHouses);
router.get('/:id', getHouseById);
router.post('/', protect, admin, createHouse);
router.put('/:id', protect, admin, updateHouse);
router.delete('/:id', protect, admin, deleteHouse);

module.exports = router;
