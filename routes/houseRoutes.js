const express = require('express');
const { getAllHouses, createHouse, updateHouse, deleteHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllHouses);
router.post('/', protect, createHouse);
router.put('/:id', protect, updateHouse);
router.delete('/:id', protect, deleteHouse);

module.exports = router;
