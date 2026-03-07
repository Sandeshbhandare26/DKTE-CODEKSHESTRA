const Prediction = require('../models/Prediction');
const axios = require('axios');

const ML_API = process.env.ML_API || 'http://127.0.0.1:8000';

// Mock price data for when ML API is not available
const getMockPriceData = (crop, mandi) => {
    const basePrices = {
        'Tomato': 1200,
        'Potato': 800,
        'Onion': 1100,
        'Cabbage': 600,
        'Carrot': 900,
        'Cauliflower': 700,
        'Cucumber': 500,
        'Spinach': 400,
        'Okra': 800,
        'Brinjal': 650,
        'Bitter Gourd': 900,
        'Bottle Gourd': 450,
        'Pumpkin': 500,
        'Radish': 350,
        'Garlic': 2500,
        'Ginger': 3000,
        'Green Chili': 1200,
        'Coriander': 600,
        'Fenugreek': 450
    };
    
    const mandis = [
        'Atpadi Wholesale Market',
        'Bhivghat Vegetable Market',
        'Miraj Vegetable Market',
        'Palus APMC Market',
        'Rab Fruits And Vegetable Market',
        'Sangli APMC Market Yard',
        'Sangli Phale Bhajipura Market',
        'Shivaji Bhaji Mandai',
        'Vasutdadamarket Yard'
    ];
    
    const selectedMandi = mandi || mandis[Math.floor(Math.random() * mandis.length)];
    const basePrice = basePrices[crop] || 1000;
    const variation = (Math.random() * 0.3) - 0.15;
    const currentPrice = Math.round(basePrice * (1 + variation));
    
    return {
        crop: crop,
        mandi: selectedMandi,
        currentPrice: currentPrice,
        previousPrice: Math.round(basePrice * (1 - variation)),
        priceChange: Math.round(((currentPrice - basePrice) / basePrice) * 100),
        trend: variation > 0 ? 'up' : 'down'
    };
};

// Generate price forecast
const getPriceForecast = (currentPrice, days = 7) => {
    const forecast = [];
    const today = new Date();
    
    for (let i = 1; i <= days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        
        const variation = (Math.random() * 0.2) - 0.08;
        const predictedPrice = Math.round(currentPrice * (1 + variation));
        
        forecast.push({
            day: i,
            date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            price: predictedPrice,
            trend: predictedPrice > currentPrice ? 'up' : 'down'
        });
    }
    
    return forecast;
};

// Get price recommendation
const getRecommendation = (currentPrice, forecast) => {
    const avgFuturePrice = forecast.reduce((sum, f) => sum + f.price, 0) / forecast.length;
    const priceChange = ((avgFuturePrice - currentPrice) / currentPrice) * 100;
    
    if (priceChange > 10) {
        return {
            action: 'Wait',
            message: 'Prices are expected to rise in the coming days. Consider holding your produce for better returns.',
            confidence: Math.round(75 + Math.random() * 20)
        };
    } else if (priceChange < -10) {
        return {
            action: 'Sell Now',
            message: 'Prices may decline. Selling now would help you secure current better rates.',
            confidence: Math.round(75 + Math.random() * 20)
        };
    } else {
        return {
            action: 'Hold',
            message: 'Prices are expected to remain stable. You can hold for a few days to assess market conditions.',
            confidence: Math.round(60 + Math.random() * 25)
        };
    }
};

// @desc    Get market prices
// @route   GET /api/market/prices
// @access  Private
const getMarketPrices = async (req, res) => {
    try {
        const crop = req.query.crop || 'Tomato';
        const mandi = req.query.mandi || '';
        
        let priceData;
        let mlResponse = null;
        
        try {
            // Call ML API with Prophet model
            const url = mandi 
                ? `${ML_API}/predict-price/${mandi}/${crop}` 
                : `${ML_API}/predict-price/${crop}`;
            
            const response = await axios.get(url, { timeout: 10000 });
            mlResponse = response.data;
            
            // Use ML API response data
            priceData = {
                crop: mlResponse.crop || crop,
                mandi: mlResponse.mandi || mandi || 'Available Market',
                currentPrice: mlResponse.today_price || 1000,
                previousPrice: mlResponse.today_price ? Math.round(mlResponse.today_price * 0.95) : 900,
                priceChange: Math.round((Math.random() * 20) - 5),
                forecast: mlResponse.forecast || getPriceForecast(mlResponse.today_price || 1000)
            };
            
            console.log('Using ML Prophet model:', mlResponse.model_used || 'Unknown');
        } catch (mlError) {
            console.log('ML API not available or error, using mock data:', mlError.message);
            priceData = getMockPriceData(crop, mandi);
            priceData.forecast = getPriceForecast(priceData.currentPrice);
        }
        
        const recommendation = getRecommendation(priceData.currentPrice, priceData.forecast);
        
        // Save to prediction history
        if (req.user && req.user._id) {
            try {
                await Prediction.create({
                    userId: req.user._id,
                    type: 'price',
                    crop: priceData.crop,
                    mandi: priceData.mandi,
                    predictedPrice: priceData.currentPrice,
                    marketPrediction: {
                        current: priceData,
                        forecast: priceData.forecast,
                        recommendation: recommendation
                    }
                });
            } catch (saveError) {
                console.log('Could not save prediction:', saveError.message);
            }
        }
        
        res.json({
            ...priceData,
            forecast: priceData.forecast,
            recommendation: recommendation
        });
    } catch (error) {
        console.error('Market prices error:', error);
        res.status(500).json({ message: 'Error fetching market prices' });
    }
};

// @desc    Get price trends
// @route   GET /api/market/trends
// @access  Private
const getPriceTrends = async (req, res) => {
    try {
        const crops = [
            'Tomato', 'Potato', 'Onion', 'Cabbage', 'Carrot',
            'Cauliflower', 'Cucumber', 'Spinach', 'Okra', 'Brinjal'
        ];
        
        const trends = crops.map(crop => {
            const priceData = getMockPriceData(crop);
            return {
                crop: crop,
                price: priceData.currentPrice,
                trend: priceData.trend,
                change: priceData.priceChange
            };
        });
        
        res.json({ trends });
    } catch (error) {
        console.error('Price trends error:', error);
        res.status(500).json({ message: 'Error fetching price trends' });
    }
};

// @desc    Get mandis
// @route   GET /api/market/mandis
// @access  Public
const getMandis = async (req, res) => {
    try {
        const mandis = [
            { name: 'Atpadi Wholesale Market', location: 'Maharashtra' },
            { name: 'Bhivghat Vegetable Market', location: 'Maharashtra' },
            { name: 'Miraj Vegetable Market', location: 'Maharashtra' },
            { name: 'Palus APMC Market', location: 'Maharashtra' },
            { name: 'Rab Fruits And Vegetable Market', location: 'Maharashtra' },
            { name: 'Sangli APMC Market Yard', location: 'Maharashtra' },
            { name: 'Sangli Phale Bhajipura Market', location: 'Maharashtra' },
            { name: 'Shivaji Bhaji Mandai', location: 'Maharashtra' },
            { name: 'Vasutdadamarket Yard', location: 'Maharashtra' }
        ];
        
        res.json({ mandis });
    } catch (error) {
        console.error('Get mandis error:', error);
        res.status(500).json({ message: 'Error fetching mandis' });
    }
};

// @desc    Get crops
// @route   GET /api/market/crops
// @access  Public
const getCrops = async (req, res) => {
    try {
        const crops = [
            { name: 'Tomato', category: 'Vegetable' },
            { name: 'Potato', category: 'Vegetable' },
            { name: 'Onion', category: 'Vegetable' },
            { name: 'Cabbage', category: 'Vegetable' },
            { name: 'Carrot', category: 'Vegetable' },
            { name: 'Cauliflower', category: 'Vegetable' },
            { name: 'Cucumber', category: 'Vegetable' },
            { name: 'Spinach', category: 'Leafy Vegetable' },
            { name: 'Okra', category: 'Vegetable' },
            { name: 'Brinjal', category: 'Vegetable' },
            { name: 'Bitter Gourd', category: 'Vegetable' },
            { name: 'Bottle Gourd', category: 'Vegetable' },
            { name: 'Pumpkin', category: 'Vegetable' },
            { name: 'Radish', category: 'Vegetable' },
            { name: 'Garlic', category: 'Spice' },
            { name: 'Ginger', category: 'Spice' },
            { name: 'Green Chili', category: 'Spice' },
            { name: 'Coriander', category: 'Leafy Vegetable' },
            { name: 'Fenugreek', category: 'Leafy Vegetable' }
        ];
        
        res.json({ crops });
    } catch (error) {
        console.error('Get crops error:', error);
        res.status(500).json({ message: 'Error fetching crops' });
    }
};

module.exports = {
    getMarketPrices,
    getPriceTrends,
    getMandis,
    getCrops
};

