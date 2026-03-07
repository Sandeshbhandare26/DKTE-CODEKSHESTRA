const express = require('express');
const router = express.Router();
const { getWeather, getWeatherByRegion, getRegions } = require('../controllers/weatherController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/regions', getRegions);

// Protected routes
router.get('/', protect, getWeather);
router.get('/:region', protect, getWeatherByRegion);

module.exports = router;

