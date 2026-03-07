const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['disease', 'price', 'weather'],
        required: true
    },
    image: {
        type: String,
        default: null
    },
    crop: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        default: 'Unknown'
    },
    disease: {
        type: String,
        default: null
    },
    confidence: {
        type: Number,
        default: 0
    },
    solution: {
        type: String,
        default: ''
    },
    weather: {
        type: Object,
        default: null
    },
    marketPrediction: {
        type: Object,
        default: null
    },
    mandi: {
        type: String,
        default: ''
    },
    predictedPrice: {
        type: Number,
        default: 0
    },
    recommendation: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
predictionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);

