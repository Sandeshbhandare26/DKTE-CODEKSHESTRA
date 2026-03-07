const express = require('express');
const router = express.Router();
const { getMarketPrices, getPriceTrends, getMandis, getCrops } = require('../controllers/marketController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/mandis', getMandis);
router.get('/crops', getCrops);

// Protected routes
router.get('/prices', protect, getMarketPrices);
router.get('/trends', protect, getPriceTrends);

module.exports = router;

