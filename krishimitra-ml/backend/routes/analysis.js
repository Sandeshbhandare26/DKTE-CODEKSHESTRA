const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { detectDisease, getHistory, deletePrediction, getCrops } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public routes
router.get('/crops', getCrops);

// Protected routes
router.post('/detect', protect, upload.single('image'), detectDisease);
router.get('/history', protect, getHistory);
router.delete('/:id', protect, deletePrediction);

module.exports = router;

