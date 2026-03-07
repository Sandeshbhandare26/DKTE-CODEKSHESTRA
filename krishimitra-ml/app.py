import os
import io
import pickle
import numpy as np
import pandas as pd

try:
    import keras
    KERAS_AVAILABLE = True
except ImportError:
    KERAS_AVAILABLE = False

from PIL import Image
from datetime import datetime, timedelta

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware


# -----------------------------------------
# FASTAPI APP
# -----------------------------------------

app = FastAPI(
    title="KrishiMitra ML Engine",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


# -----------------------------------------
# PATHS
# -----------------------------------------

BASE_DIR = os.path.dirname(__file__)

DATA_PATH = os.path.join(BASE_DIR, "refined_data.csv")

MODEL_FOLDER = os.path.join(BASE_DIR, "models")

CNN_MODEL_PATH = os.path.join(BASE_DIR, "cropguard_best.keras")


# -----------------------------------------
# LOAD DATASET
# -----------------------------------------

print("Loading dataset...")

try:
    crop_data = pd.read_csv(DATA_PATH)
    print("Dataset rows:", len(crop_data))
except Exception as e:
    print(f"Error loading dataset: {e}")
    crop_data = pd.DataFrame()


# -----------------------------------------
# LOAD CNN MODEL
# -----------------------------------------

print("Loading disease detection model...")

cnn_model = None
try:
    if os.path.exists(CNN_MODEL_PATH) and os.path.getsize(CNN_MODEL_PATH) > 0:
        cnn_model = keras.models.load_model(CNN_MODEL_PATH)
        print("CNN model loaded")
    else:
        print("CNN model file not found or empty, skipping...")
        KERAS_AVAILABLE = False
except Exception as e:
    print(f"Error loading CNN model: {e}")
    KERAS_AVAILABLE = False


# -----------------------------------------
# LOAD PRICE MODELS (Prophet)
# -----------------------------------------

print("Loading price models...")

price_models = {}

try:
    if os.path.exists(MODEL_FOLDER):
        for file in os.listdir(MODEL_FOLDER):
            if file.endswith(".pkl"):
                path = os.path.join(MODEL_FOLDER, file)
                try:
                    with open(path, "rb") as f:
                        name = file.replace(".pkl", "")
                        price_models[name] = pickle.load(f)
                except Exception as e:
                    print(f"Error loading model {file}: {e}")
    
    print("Loaded price models:", len(price_models))
    print("Available models:", list(price_models.keys())[:5], "...")
except Exception as e:
    print(f"Error scanning model folder: {e}")


# -----------------------------------------
# DISEASE CLASSES
# -----------------------------------------

disease_classes = [
    "Healthy",
    "Leaf Blight",
    "Powdery Mildew",
    "Rust",
    "Bacterial Spot",
    "Mosaic Virus",
    "Anthracnose",
    "Downy Mildew",
    "Early Blight",
    "Late Blight"
]


# -----------------------------------------
# IMAGE PREPROCESS
# -----------------------------------------

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, 0)
    return image


# -----------------------------------------
# HEALTH CHECK
# -----------------------------------------

@app.get("/")
def home():
    return {
        "service": "KrishiMitra ML",
        "dataset_records": len(crop_data) if not crop_data.empty else 0,
        "price_models": len(price_models),
        "cnn_loaded": cnn_model is not None
    }


# -----------------------------------------
# DISEASE DETECTION
# -----------------------------------------

@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    if cnn_model is None:
        return {
            "disease": "Model not loaded",
            "confidence": 0,
            "error": "CNN model not available"
        }
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        img = preprocess_image(image)
        prediction = cnn_model.predict(img)
        
        index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
        disease = disease_classes[index]
        
        return {
            "disease": disease,
            "confidence": round(confidence * 100, 2)
        }
    except Exception as e:
        return {
            "disease": "Error",
            "confidence": 0,
            "error": str(e)
        }


# -----------------------------------------
# PRICE PREDICTION using Prophet Models
# -----------------------------------------

@app.get("/predict-price/{crop}")
def predict_price(crop: str, days: int = 7, mandi: str = None):
    """
    Predict price using Prophet models.
    - crop: Name of the crop (e.g., Tomato, Potato, Onion)
    - days: Number of days to forecast (default 7)
    - mandi: Optional mandi name
    """
    
    # Map common crop names to model file names
    crop_mapping = {
        'tomato': 'Tomato',
        'potato': 'Potato', 
        'onion': 'Onion Big',
        'cabbage': 'Cabbage',
        'carrot': 'Carrot',
        'cauliflower': 'Cauliflower',
        'cucumber': 'Cucumber',
        'spinach': 'Spinach',
        'okra': 'Okra',
        'brinjal': 'Brinjal Big',
        'bitter gourd': 'Bitter gourd',
        'bottle gourd': 'Bottlegourd',
        'pumpkin': 'Pumpkin',
        'radish': 'Radish',
        'garlic': 'Garlic',
        'ginger': 'Ginger',
        'green chili': 'Green chili',
        'coriander': 'Coriander leaves',
        'fenugreek': 'Fenugreek leaves'
    }
    
    crop_key = crop.lower()
    model_crop = crop_mapping.get(crop_key, crop.capitalize())
    
    # Get available mandis
    available_mandis = [
        'Atpadi Wholesale Market',
        'Bhivghat Vegetable Market', 
        'Miraj Vegetable Market',
        'Palus APMC Market',
        'Rab Fruits And Vegetable Market',
        'Sangli APMC Market Yard',
        'Sangli Phale Bhajipura Market',
        'Shivaji Bhaji Mandai',
        'Vasutdadamarket Yard'
    ]
    
    # Try to find the model
    model_key = None
    selected_mandi = None
    
    # If mandi is specified, try to find that specific model
    if mandi:
        model_key = f"{mandi}_{model_crop}"
        if model_key in price_models:
            selected_mandi = mandi
        else:
            model_key = None
    
    # If no specific model found, try to find any model for this crop
    if model_key is None:
        for m in available_mandis:
            test_key = f"{m}_{model_crop}"
            if test_key in price_models:
                model_key = test_key
                selected_mandi = m
                break
    
    # If still no model, try with different crop names
    if model_key is None:
        for test_crop in [crop.capitalize(), crop.upper(), crop.lower()]:
            for m in available_mandis:
                test_key = f"{m}_{test_crop}"
                if test_key in price_models:
                    model_key = test_key
                    selected_mandi = m
                    model_crop = test_crop
                    break
            if model_key:
                break
    
    # If we found a model, use it
    if model_key and model_key in price_models:
        try:
            model = price_models[model_key]
            
            # Create future dataframe for prediction
            future = model.make_future_dataframe(periods=days)
            
            # Make prediction
            forecast = model.predict(future)
            
            # Get last 'days' predictions
            result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(days)
            
            # Format results
            forecast_data = []
            day_num = 1
            for _, row in result.iterrows():
                forecast_data.append({
                    "day": day_num,
                    "date": row['ds'].strftime("%d-%m-%Y") if hasattr(row['ds'], 'strftime') else str(row['ds'])[:10],
                    "price": int(row['yhat']),
                    "lower": int(row['yhat_lower']),
                    "upper": int(row['yhat_upper'])
                })
                day_num += 1
            
            # Get today's price (first prediction in the future)
            today_price = int(forecast['yhat'].iloc[-days]) if len(forecast) >= days else int(forecast['yhat'].iloc[-1])
            
            return {
                "crop": crop.capitalize(),
                "mandi": selected_mandi or "Any Available Market",
                "today_price": today_price,
                "forecast": forecast_data,
                "model_used": model_key
            }
            
        except Exception as e:
            print(f"Error using Prophet model: {e}")
    
    # Fallback: Use random data if model not found or error
    crop = crop.lower()
    
    if not crop_data.empty:
        filtered = crop_data[
            crop_data["Commodity"].str.lower() == crop
        ]

        if len(filtered) > 0:
            base_price = int(filtered["Modal Price"].mean())
        else:
            base_price = 2000
    else:
        base_price = 2000

    forecast = []
    today = datetime.now()

    for i in range(1, days + 1):
        variation = np.random.uniform(-0.1, 0.15)
        predicted = int(base_price * (1 + variation))

        forecast.append({
            "day": i,
            "date": (today + timedelta(days=i)).strftime("%d-%m-%Y"),
            "price": predicted
        })

    return {
        "crop": crop,
        "today_price": base_price,
        "forecast": forecast,
        "note": "Using fallback data - model not found"
    }


# -----------------------------------------
# GET PRICE FOR SPECIFIC MANDI
# -----------------------------------------

@app.get("/predict-price/{mandi}/{crop}")
def predict_price_for_mandi(mandi: str, crop: str, days: int = 7):
    """Get price prediction for specific mandi and crop"""
    return predict_price(crop, days, mandi)


# -----------------------------------------
# GET CROPS
# -----------------------------------------

@app.get("/crops")
def get_crops():
    if not crop_data.empty:
        crops = crop_data["Commodity"].unique()
        return {
            "available_crops": list(crops)
        }
    return {
        "available_crops": ["Tomato", "Potato", "Onion", "Cabbage", "Carrot", "Cauliflower", "Cucumber", "Spinach", "Okra", "Brinjal"]
    }


# -----------------------------------------
# GET AVAILABLE MODELS
# -----------------------------------------

@app.get("/models")
def get_available_models():
    """List all available price prediction models"""
    return {
        "total_models": len(price_models),
        "models": list(price_models.keys())
    }
