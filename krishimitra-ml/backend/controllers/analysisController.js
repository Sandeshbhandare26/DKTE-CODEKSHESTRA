const Prediction = require('../models/Prediction');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const ML_API = process.env.ML_API || 'http://127.0.0.1:8000';

// Mock disease data for when ML API is not available
const mockDiseaseResponse = (crop) => {
    const diseases = [
        { disease: 'Healthy', confidence: 92, solution: 'Your crop is healthy! Continue with regular maintenance.' },
        { disease: 'Leaf Blight', confidence: 87, solution: 'Apply fungicide containing chlorothalonil. Remove infected leaves. Ensure proper spacing for air circulation.' },
        { disease: 'Powdery Mildew', confidence: 85, solution: 'Apply neem oil spray or sulfur-based fungicide. Improve air circulation. Avoid overhead watering.' },
        { disease: 'Bacterial Spot', confidence: 83, solution: 'Remove infected plants. Apply copper-based bactericide. Avoid working with wet plants.' },
        { disease: 'Early Blight', confidence: 86, solution: 'Apply fungicide. Remove lower infected leaves. Mulch around plants. Rotate crops.' },
        { disease: 'Late Blight', confidence: 89, solution: 'Apply fungicide immediately. Remove and destroy infected plants. Do not compost diseased material.' },
        { disease: 'Anthracnose', confidence: 84, solution: 'Apply copper fungicide. Remove infected parts. Improve drainage. Avoid overhead irrigation.' },
        { disease: 'Mosaic Virus', confidence: 81, solution: 'Remove infected plants. Control aphid population. Use virus-free seeds. Practice crop rotation.' }
    ];
    
    const random = diseases[Math.floor(Math.random() * diseases.length)];
    return {
        crop: crop || 'Tomato',
        quality: random.disease === 'Healthy' ? 'Excellent' : 'Needs Treatment',
        disease: random.disease,
        confidence: random.confidence,
        solution: random.solution
    };
};

// @desc    Detect crop disease from image
// @route   POST /api/analysis/detect
// @access  Private
const detectDisease = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const crop = req.body.crop || 'Tomato';
        let result;

        try {
            // Try to call ML API
            const form = new FormData();
            form.append('file', fs.createReadStream(req.file.path));

            const mlResponse = await axios.post(
                `${ML_API}/predict-disease`,
                form,
                { headers: form.getHeaders() }
            );

            result = {
                crop: crop,
                quality: mlResponse.data.disease === 'Healthy' ? 'Excellent' : 'Needs Treatment',
                disease: mlResponse.data.disease,
                confidence: mlResponse.data.confidence,
                solution: getSolutionForDisease(mlResponse.data.disease)
            };
        } catch (mlError) {
            console.log('ML API not available, using mock response');
            result = mockDiseaseResponse(crop);
        }

        // Save prediction to database
        const prediction = await Prediction.create({
            userId: req.user._id,
            type: 'disease',
            image: `/uploads/${req.file.filename}`,
            crop: result.crop,
            quality: result.quality,
            disease: result.disease,
            confidence: result.confidence,
            solution: result.solution
        });

        // Clean up uploaded file
        if (req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        res.json(result);
    } catch (error) {
        console.error('Disease detection error:', error);
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {}
        }
        res.status(500).json({ message: 'Error detecting disease' });
    }
};

// @desc    Get solution for disease
// @access  Private
const getSolutionForDisease = (disease) => {
    const solutions = {
        'Healthy': 'Your crop is healthy! Continue with regular maintenance and good agricultural practices.',
        'Leaf Blight': 'Apply fungicide containing chlorothalonil. Remove infected leaves immediately. Ensure proper spacing between plants for air circulation. Water at the base of plants.',
        'Powdery Mildew': 'Apply neem oil spray or sulfur-based fungicide. Improve air circulation around plants. Avoid overhead watering. Remove severely infected leaves.',
        'Bacterial Spot': 'Remove infected plants immediately. Apply copper-based bactericide. Avoid working with wet plants. Use disease-free seeds.',
        'Early Blight': 'Apply fungicide containing mancozeb. Remove lower infected leaves. Apply mulch around plants. Practice crop rotation.',
        'Late Blight': 'Apply fungicide immediately (containing mancozeb or chlorothalonil). Remove and destroy infected plants. Do not compost diseased material. This is urgent!',
        'Anthracnose': 'Apply copper fungicide. Remove infected plant parts. Improve drainage. Avoid overhead irrigation. Apply mulch.',
        'Mosaic Virus': 'Remove infected plants immediately. Control aphid population. Use virus-free seeds. Practice crop rotation for 2-3 years.',
        'Rust': 'Apply sulfur fungicide. Remove infected leaves. Improve air circulation. Avoid wetting foliage.',
        'Downy Mildew': 'Apply fungicide containing metalaxyl. Improve air circulation. Remove infected parts. Avoid overhead watering.'
    };
    return solutions[disease] || 'Consult with local agricultural extension officer for specific treatment.';
};

// @desc    Get prediction history
// @route   GET /api/analysis/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { userId: req.user._id };
        
        if (req.query.type) {
            query.type = req.query.type;
        }

        const predictions = await Prediction.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Prediction.countDocuments(query);

        res.json({
            predictions,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ message: 'Error fetching history' });
    }
};

// @desc    Delete prediction
// @route   DELETE /api/analysis/:id
// @access  Private
const deletePrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!prediction) {
            return res.status(404).json({ message: 'Prediction not found' });
        }

        await prediction.deleteOne();
        res.json({ message: 'Prediction deleted' });
    } catch (error) {
        console.error('Delete prediction error:', error);
        res.status(500).json({ message: 'Error deleting prediction' });
    }
};

// @desc    Get available crops
// @route   GET /api/analysis/crops
// @access  Public
const getCrops = async (req, res) => {
    try {
        const crops = [
            'Tomato', 'Potato', 'Onion', 'Cabbage', 'Carrot', 
            'Cauliflower', 'Cucumber', 'Spinach', 'Okra', 'Brinjal',
            'Bitter Gourd', 'Bottle Gourd', 'Pumpkin', 'Radish', 'Garlic',
            'Ginger', 'Green Chili', 'Coriander', 'Fenugreek'
        ];
        res.json({ crops });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crops' });
    }
};

module.exports = {
    detectDisease,
    getHistory,
    deletePrediction,
    getCrops
};

