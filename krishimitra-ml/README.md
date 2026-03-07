# KrishiMitra 2.0 - Grow Smart. Sell Smarter

A full-stack agriculture AI platform that helps farmers detect crop diseases, analyze weather risk, predict mandi prices, and maximize income.

## Features

- 🌾 **Crop Disease Detection** - Upload crop photos and get instant AI-powered disease detection
- 🌦️ **Weather Risk Alerts** - Real-time weather updates and AI-powered risk alerts
- 📈 **Mandi Price Forecasting** - Predict market prices and get selling recommendations
- 💰 **Income Optimization** - Track expenses and maximize farming profits
- 🎙️ **Voice Assistant** - Text-to-speech support for farmers
- 📱 **Modern Dashboard** - Beautiful, mobile-responsive UI

## Tech Stack

### Frontend
- EJS Template Engine
- Tailwind CSS
- Chart.js
- Vanilla JavaScript
- Web Speech API

### Backend
- Node.js
- Express.js
- FastAPI (ML API)
- Multer for image uploads

## Project Structure

```
krishimitra-ml/
├── app.py                 # FastAPI ML server
├── requirements.txt       # Python dependencies
├── backend/
│   ├── server.js         # Express.js server
│   ├── package.json      # Node.js dependencies
│   ├── routes/           # API routes
│   └── controllers/      # Route controllers
├── frontend/
│   ├── views/           # EJS templates
│   ├── public/          # Static files
│   └── tailwind.config.js
├── models/              # ML price prediction models
└── refined_data.csv     # Price data
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- pip

### Step 1: Install Python Dependencies

```bash
cd krishimitra-ml
pip install -r requirements.txt
```

### Step 2: Install Node.js Dependencies

```bash
cd krishimitra-ml/backend
npm install
```

### Step 3: Start the ML API Server

```bash
# Terminal 1
cd krishimitra-ml
uvicorn app:app --host 127.0.0.1 --port```

### 8000
 Step 4: Start the Backend Server

```bash
# Terminal 2
cd krishimitra-ml/backend
node server.js
```

### Step 5: Open the Application

Navigate to: http://localhost:3000

## API Endpoints

### ML API (Port 8000)
- `GET /` - Health check
- `POST /predict-disease` - Detect crop disease from image
- `GET /predict-price/{crop}` - Get price prediction for a crop
- `GET /crops` - Get list of available crops

### Backend API (Port 3000)
- `GET /` - Landing page
- `GET /login` - Login page
- `GET /register` - Registration page
- `GET /dashboard` - User dashboard
- `GET /analysis` - Crop disease analysis
- `POST /detect` - Process uploaded image
- `GET /weather` - Weather insights
- `GET /market` - Market prices
- `GET /history` - Prediction history
- `GET /profile` - User profile
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

## Demo Accounts

For testing, use any email and password to log in.

## Screenshots

The application includes:
- Modern landing page with hero section
- Login/Register with language selector
- Dashboard with stats and charts
- Crop disease detection with image upload
- Weather insights with 7-day forecast
- Market price predictions
- Prediction history with search/filter
- Profile settings

## License

MIT License - © 2026 KrishiMitra

