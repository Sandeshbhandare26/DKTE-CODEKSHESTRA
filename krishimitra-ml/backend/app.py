import os
import io
import numpy as np
import pandas as pd
import tensorflow as tf
from PIL import Image
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

BASE = os.path.dirname(__file__)

dataset = pd.read_csv(os.path.join(BASE,"../refined_data.csv"))

cnn_model = tf.keras.models.load_model(
    os.path.join(BASE,"../cropguard_best.keras")
)

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

def preprocess(img):

    img = img.resize((224,224))
    img = np.array(img)/255
    img = np.expand_dims(img,0)

    return img


@app.get("/")
def home():

    return {"status":"ML Service Running"}


@app.post("/predict")

async def predict(file:UploadFile=File(...)):

    contents = await file.read()

    img = Image.open(io.BytesIO(contents)).convert("RGB")

    img = preprocess(img)

    prediction = cnn_model.predict(img)

    index = int(np.argmax(prediction))

    confidence = float(np.max(prediction))

    return {
        "disease":disease_classes[index],
        "confidence":round(confidence*100,2)
    }


@app.get("/price/{crop}")

def predict_price(crop:str):

    filtered = dataset[
        dataset["Commodity"].str.lower()==crop.lower()
    ]

    if len(filtered)>0:
        base = filtered["Modal Price"].mean()
    else:
        base = 2000

    forecast=[]

    for i in range(1,8):

        price=int(base*(1+np.random.uniform(-0.1,0.15)))

        forecast.append({
            "day":i,
            "price":price
        })

    return {
        "crop":crop,
        "today_price":int(base),
        "forecast":forecast
    }
