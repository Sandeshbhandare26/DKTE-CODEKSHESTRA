const Prediction = require('../models/Prediction');

// Mock weather data for demonstration
const getMockWeatherData = (region) => {
    const regions = {
        'Maharashtra': { temp: 28, humidity: 65, wind: 12, rain: 20 },
        'Punjab': { temp: 22, humidity: 55, wind: 8, rain: 5 },
        'Karnataka': { temp: 26, humidity: 70, wind: 10, rain: 35 },
        'Tamil Nadu': { temp: 30, humidity: 75, wind: 14, rain: 45 },
        'Uttar Pradesh': { temp: 25, humidity: 60, wind: 9, rain: 15 },
        'Gujarat': { temp: 29, humidity: 50, wind: 11, rain: 10 },
        'West Bengal': { temp: 27, humidity: 80, wind: 7, rain: 60 },
        'Madhya Pradesh': { temp: 24, humidity: 58, wind: 8, rain: 12 }
    };
    
    return regions[region] || regions['Maharashtra'];
};

// Generate 7-day forecast
const get7DayForecast = (baseWeather) => {
    const forecast = [];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain'];
    
    for (let i = 1; i <= 7; i++) {
        const tempVariation = Math.random() * 6 - 3;
        const humidityVariation = Math.random() * 20 - 10;
        const rainChance = Math.random() * 100;
        
        forecast.push({
            day: i,
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
            temp: Math.round(baseWeather.temp + tempVariation),
            humidity: Math.round(Math.max(30, Math.min(95, baseWeather.humidity + humidityVariation))),
            rainChance: Math.round(Math.min(95, rainChance)),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            icon: rainChance > 50 ? '🌧️' : rainChance > 20 ? '⛅' : '☀️'
        });
    }
    
    return forecast;
};

// Get AI alerts based on weather
const getAIAlerts = (weather, forecast) => {
    const alerts = [];
    
    // Temperature alerts
    if (weather.temp > 35) {
        alerts.push({
            type: 'danger',
            title: 'High Temperature Alert',
            message: 'Temperature is above 35°C. Ensure adequate irrigation and provide shade to sensitive crops.'
        });
    } else if (weather.temp > 30) {
        alerts.push({
            type: 'warning',
            title: 'Warm Weather',
            message: 'Temperature is high. Monitor soil moisture and water crops accordingly.'
        });
    }
    
    // Rain alerts
    if (weather.rain > 50) {
        alerts.push({
            type: 'danger',
            title: 'Heavy Rain Warning',
            message: 'Heavy rainfall expected. Ensure proper drainage and avoid field work.'
        });
    } else if (weather.rain > 25) {
        alerts.push({
            type: 'info',
            title: 'Rain Expected',
            message: 'Rain is likely. Consider postponing irrigation and protect harvested crops.'
        });
    }
    
    // Humidity alerts
    if (weather.humidity > 80) {
        alerts.push({
            type: 'warning',
            title: 'High Humidity',
            message: 'High humidity may increase fungal disease risk. Monitor crops for disease symptoms.'
        });
    }
    
    // General farming insights
    alerts.push({
        type: 'success',
        title: 'Optimal Sowing Window',
        message: 'Current conditions are favorable for sowing leafy vegetables.'
    });
    
    if (weather.wind < 15) {
        alerts.push({
            type: 'info',
            title: 'Pest Control Alert',
            message: 'Low wind speed is ideal for applying pesticides and fungicides.'
        });
    }
    
    return alerts;
};

// @desc    Get weather data
// @route   GET /api/weather
// @access  Private
const getWeather = async (req, res) => {
    try {
        const region = req.query.region || 'Maharashtra';
        const baseWeather = getMockWeatherData(region);
        
        const forecast = get7DayForecast(baseWeather);
        const alerts = getAIAlerts(baseWeather, forecast);
        
        // Save weather prediction to database
        const prediction = await Prediction.create({
            userId: req.user._id,
            type: 'weather',
            crop: 'General',
            weather: {
                current: baseWeather,
                forecast: forecast,
                alerts: alerts
            }
        });
        
        res.json({
            current: baseWeather,
            forecast: forecast,
            alerts: alerts,
            region: region,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Weather error:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

// @desc    Get weather for specific location
// @route   GET /api/weather/:region
// @access  Private
const getWeatherByRegion = async (req, res) => {
    try {
        const region = req.params.region || 'Maharashtra';
        const baseWeather = getMockWeatherData(region);
        const forecast = get7DayForecast(baseWeather);
        const alerts = getAIAlerts(baseWeather, forecast);
        
        res.json({
            current: baseWeather,
            forecast: forecast,
            alerts: alerts,
            region: region,
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        console.error('Weather error:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

// @desc    Get available regions
// @route   GET /api/weather/regions
// @access  Public
const getRegions = async (req, res) => {
    try {
        const regions = [
            'Maharashtra', 'Punjab', 'Karnataka', 'Tamil Nadu', 
            'Uttar Pradesh', 'Gujarat', 'West Bengal', 'Madhya Pradesh',
            'Rajasthan', 'Haryana', 'Andhra Pradesh', 'Telangana'
        ];
        res.json({ regions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching regions' });
    }
};

module.exports = {
    getWeather,
    getWeatherByRegion,
    getRegions
};

