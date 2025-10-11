import io
import os
import sys
from typing import Optional

import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator

# Third-party libs for models
from PIL import Image
import pandas as pd
import torch
import torch.nn.functional as F


# -----------------------------
# Path setup to reuse repo assets
# -----------------------------
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
AGRIGO_DIR = os.path.join(REPO_ROOT, 'AgriGo', 'AgriGo')
PLANT_APP_DIR = os.path.join(REPO_ROOT, 'Plant-Disease-Detection', 'Flask Deployed App')

# Ensure assets exist
if not os.path.isdir(AGRIGO_DIR):
    raise RuntimeError(f"AgriGo assets not found at {AGRIGO_DIR}")
if not os.path.isdir(PLANT_APP_DIR):
    raise RuntimeError(f"Plant-Disease-Detection assets not found at {PLANT_APP_DIR}")


# -----------------------------
# Constants (mirrored from AgriGo)
# -----------------------------
crops_list = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton', 'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans', 'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate', 'rice', 'watermelon']

soil_types = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy']
crop_types = ['Barley', 'Cotton', 'Ground Nuts', 'Maize', 'Millets', 'Oil seeds', 'Paddy', 'Pulses', 'Sugarcane', 'Tobacco', 'Wheat']

fertilizer_classes = ['10-26-26', '14-35-14', '17-17-17', '20-20', '28-28', 'DAP', 'Urea']


# -----------------------------
# Load ML models (AgriGo - scikit-learn pickles)
# -----------------------------
import pickle

ML_MODELS_DIR = os.path.join(AGRIGO_DIR, 'models', 'ML_models')
CACHE_MODELS_DIR = os.path.join(os.path.dirname(__file__), 'cache_models')
os.makedirs(CACHE_MODELS_DIR, exist_ok=True)
_CROP_SCALER_PATH = os.path.join(ML_MODELS_DIR, 'crop_scaler.pkl')
_CROP_MODEL_PATH = os.path.join(ML_MODELS_DIR, 'crop_model.pkl')
_FERT_SCALER_PATH = os.path.join(ML_MODELS_DIR, 'fertilizer_scaler.pkl')
_FERT_MODEL_PATH = os.path.join(ML_MODELS_DIR, 'fertilizer_model.pkl')

if not (os.path.isfile(_CROP_SCALER_PATH) and os.path.isfile(_CROP_MODEL_PATH)):
    raise RuntimeError("Crop recommendation model/scaler not found in AgriGo models")
if not (os.path.isfile(_FERT_SCALER_PATH) and os.path.isfile(_FERT_MODEL_PATH)):
    raise RuntimeError("Fertilizer model/scaler not found in AgriGo models")

def _load_pickle(path):
    with open(path, 'rb') as f:
        return pickle.load(f)

def _save_pickle(obj, path):
    with open(path, 'wb') as f:
        pickle.dump(obj, f)

# Attempt to load original pickles; if incompatible, retrain from CSVs
def _load_or_train_models():
    try:
        crop_scaler = _load_pickle(_CROP_SCALER_PATH)
        crop_model = _load_pickle(_CROP_MODEL_PATH)
        fert_scaler = _load_pickle(_FERT_SCALER_PATH)
        fert_model = _load_pickle(_FERT_MODEL_PATH)
        return crop_scaler, crop_model, fert_scaler, fert_model
    except Exception as e:
        # Try cache first
        cache_crop_scaler = os.path.join(CACHE_MODELS_DIR, 'crop_scaler.pkl')
        cache_crop_model = os.path.join(CACHE_MODELS_DIR, 'crop_model.pkl')
        cache_fert_scaler = os.path.join(CACHE_MODELS_DIR, 'fertilizer_scaler.pkl')
        cache_fert_model = os.path.join(CACHE_MODELS_DIR, 'fertilizer_model.pkl')
        try:
            crop_scaler = _load_pickle(cache_crop_scaler)
            crop_model = _load_pickle(cache_crop_model)
            fert_scaler = _load_pickle(cache_fert_scaler)
            fert_model = _load_pickle(cache_fert_model)
            return crop_scaler, crop_model, fert_scaler, fert_model
        except Exception:
            # Retrain minimal equivalents from CSVs
            from sklearn.preprocessing import StandardScaler
            from sklearn.tree import DecisionTreeClassifier

            # Crop recommendation
            crop_csv = os.path.join(AGRIGO_DIR, 'dataset', 'Crop_recommendation.csv')
            dfc = pd.read_csv(crop_csv)
            Xc = dfc[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']].to_numpy(dtype=np.float32)
            # Map labels to index based on crops_list when possible; else fallback to factorized order
            label_map = {name: i for i, name in enumerate(crops_list)}
            yc = dfc['label'].map(lambda x: label_map.get(x, None))
            if yc.isnull().any():
                # Fallback: create mapping
                unique_labels = sorted(dfc['label'].unique().tolist())
                label_map = {name: i for i, name in enumerate(unique_labels)}
                yc = dfc['label'].map(label_map)
            yc = yc.to_numpy(dtype=np.int64)
            crop_scaler = StandardScaler()
            Xc_scaled = crop_scaler.fit_transform(Xc)
            crop_model = DecisionTreeClassifier(random_state=42)
            crop_model.fit(Xc_scaled, yc)

            # Fertilizer
            fert_csv = os.path.join(AGRIGO_DIR, 'dataset', 'Fertilizer Prediction.csv')
            dff = pd.read_csv(fert_csv)
            # Normalize column names (strip spaces)
            dff.columns = [c.strip() for c in dff.columns]
            # Numeric features
            Xf_num = dff[['Temparature', 'Humidity', 'Moisture', 'Nitrogen', 'Potassium', 'Phosphorous']].to_numpy(dtype=np.float32)
            fert_scaler = StandardScaler()
            Xf_scaled = fert_scaler.fit_transform(Xf_num)
            # Categorical indices using predefined order
            soil_idx = dff['Soil Type'].map(lambda x: soil_types.index(str(x).strip()) if str(x).strip() in soil_types else 0).to_numpy().reshape(-1, 1)
            crop_idx = dff['Crop Type'].map(lambda x: crop_types.index(str(x).strip()) if str(x).strip() in crop_types else 0).to_numpy().reshape(-1, 1)
            Xf = np.concatenate([Xf_scaled, soil_idx, crop_idx], axis=1)
            # Labels mapping
            fert_label_map = {name: i for i, name in enumerate(fertilizer_classes)}
            yf = dff['Fertilizer Name'].map(lambda x: fert_label_map.get(str(x).strip(), None))
            if yf.isnull().any():
                # Fallback to factorized
                unique_f = sorted(dff['Fertilizer Name'].unique().tolist())
                fert_label_map = {name: i for i, name in enumerate(unique_f)}
                yf = dff['Fertilizer Name'].map(fert_label_map)
            yf = yf.to_numpy(dtype=np.int64)
            fert_model = DecisionTreeClassifier(random_state=42)
            fert_model.fit(Xf, yf)

            # Cache for reuse
            try:
                _save_pickle(crop_scaler, cache_crop_scaler)
                _save_pickle(crop_model, cache_crop_model)
                _save_pickle(fert_scaler, cache_fert_scaler)
                _save_pickle(fert_model, cache_fert_model)
            except Exception:
                pass

            return crop_scaler, crop_model, fert_scaler, fert_model


CROP_SCALER, CROP_MODEL, FERT_SCALER, FERT_MODEL = _load_or_train_models()


# -----------------------------
# Load Torch disease detection model and metadata (Plant-Disease-Detection)
# -----------------------------
sys.path.append(PLANT_APP_DIR)
try:
    import CNN  # type: ignore
except Exception as e:
    raise RuntimeError(f"Failed to import CNN from Plant-Disease-Detection: {e}")

_DISEASE_INFO_CSV = os.path.join(PLANT_APP_DIR, 'disease_info.csv')
_SUPP_INFO_CSV = os.path.join(PLANT_APP_DIR, 'supplement_info.csv')
_TORCH_MODEL_PATH = os.path.join(PLANT_APP_DIR, 'plant_disease_model_1_latest.pt')

if not (os.path.isfile(_DISEASE_INFO_CSV) and os.path.isfile(_SUPP_INFO_CSV) and os.path.isfile(_TORCH_MODEL_PATH)):
    raise RuntimeError("Missing Plant-Disease-Detection assets (csvs or .pt model)")

disease_info = pd.read_csv(_DISEASE_INFO_CSV, encoding='cp1252')
supplement_info = pd.read_csv(_SUPP_INFO_CSV, encoding='cp1252')

_NUM_CLASSES = 39
_torch_model = CNN.CNN(_NUM_CLASSES)
_torch_model.load_state_dict(torch.load(_TORCH_MODEL_PATH, map_location='cpu'))
_torch_model.eval()


# -----------------------------
# FastAPI app and schemas
# -----------------------------
app = FastAPI(
    title="Unified Agri API",
    version="1.0.0",
    description=(
        "Unified endpoints combining Plant-Disease-Detection (disease classification + info) "
        "and AgriGo (crop recommendation and fertilizer recommendation)."
    ),
    contact={"name": "Agri API", "email": "support@example.com"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def root():
    return JSONResponse({
        "status": "ok",
        "service": "Unified Agri API",
        "endpoints": ["/health", "/disease/predict", "/yield-and-fertilizer", "/docs"],
    })


class DiseasePrediction(BaseModel):
    disease_index: int = Field(..., ge=0, lt=39)
    disease_name: str
    confidence: float = Field(..., ge=0.0, le=1.0, description="Top-1 softmax probability")
    description: Optional[str] = None
    prevention_steps: Optional[str] = Field(None, description="Possible steps to prevent/control")
    image_url: Optional[str] = None
    supplement: Optional[dict] = Field(
        default=None,
        description="Recommended supplement info: name, image, buy_link",
        example={"name": "Fungicide X", "image": "https://...", "buy_link": "https://..."},
    )


# Supported per-crop classes for optional Keras approach (from AgriGo)
crop_diseases_classes = {'strawberry': [(0, 'Leaf_scorch'), (1, 'healthy')],

                             'patato': [(0, 'Early_blight'),
                                 (1, 'Late_blight'),
                                 (2, 'healthy')],

                             'corn': [(0, 'Cercospora_leaf_spot Gray_leaf_spot'),
                                 (1, 'Common_rust_'),
                                 (2, 'Northern_Leaf_Blight'),
                                 (3, 'healthy')],

                             'apple': [(0, 'Apple_scab'),
                                 (1, 'Black_rot'),
                                 (2, 'Cedar_apple_rust'),
                                 (3, 'healthy')],

                             'cherry': [(0, 'Powdery_mildew'),
                                 (1, 'healthy')],

                             'grape': [(0, 'Black_rot'),
                                 (1, 'Esca_(Black_Measles)'),
                                 (2, 'Leaf_blight_(Isariopsis_Leaf_Spot)'),
                                 (3, 'healthy')],

                             'peach': [(0, 'Bacterial_spot'), (1, 'healthy')],

                             'pepper': [(0, 'Bacterial_spot'),
                                 (1, 'healthy')],
                
                             'tomato': [(0, 'Bacterial_spot'),
                                 (1, 'Early_blight'),
                                 (2, 'Late_blight'),
                                 (3, 'Leaf_Mold'),
                                 (4, 'Septoria_leaf_spot'),
                                 (5, 'Spider_mites Two-spotted_spider_mite'),
                                 (6, 'Target_Spot'),
                                 (7, 'Tomato_Yellow_Leaf_Curl_Virus'),
                                 (8, 'Tomato_mosaic_virus'),
                                 (9, 'healthy')]}


class YieldFertilizerRequest(BaseModel):
    # Crop recommendation inputs
    N: float = Field(..., description="Nitrogen content in soil")
    P: float = Field(..., description="Phosphorus content in soil")
    K: float = Field(..., description="Potassium content in soil")
    temperature: float = Field(..., description="Temperature in °C")
    humidity: float = Field(..., description="Relative humidity in %")
    ph: float = Field(..., description="Soil pH")
    rainfall: float = Field(..., description="Rainfall in mm")

    # Fertilizer recommendation inputs
    fert_temperature: float = Field(..., description="Field temperature in °C")
    fert_humidity: float = Field(..., description="Field humidity in %")
    moisture: float = Field(..., description="Soil moisture in %")
    soil_type: str = Field(..., description=f"One of: {', '.join(soil_types)}")
    crop_type: str = Field(..., description=f"One of: {', '.join(crop_types)}")
    nitrogen: float = Field(..., description="Nitrogen value")
    potassium: float = Field(..., description="Potassium value")
    phosphorous: float = Field(..., description="Phosphorous value")

    @validator('soil_type')
    def validate_soil(cls, v):
        if v not in soil_types:
            raise ValueError(f"soil_type must be one of {soil_types}")
        return v

    @validator('crop_type')
    def validate_crop(cls, v):
        if v not in crop_types:
            raise ValueError(f"crop_type must be one of {crop_types}")
        return v


class YieldFertilizerResponse(BaseModel):
    recommended_crop: str
    fertilizer: str


@app.get("/metadata/fertilizer-options")
def fertilizer_options():
    return {
        "soil_types": soil_types,
        "crop_types": crop_types,
        "fertilizer_classes": fertilizer_classes,
    }


@app.post(
    "/disease/predict",
    response_model=DiseasePrediction,
    summary="Detect plant disease from an image",
    tags=["disease"],
)
async def predict_disease(
    file: UploadFile = File(..., description="Leaf image file"),
    approach: str = Query("torch", regex=r"^(torch|keras)$", description="'torch' (default, 39 classes) or 'keras' (per-crop AgriGo)"),
    crop: Optional[str] = Query(None, description="Required for approach=keras. One of: " + ", ".join(sorted(crop_diseases_classes.keys()))),
):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    if approach == 'torch':
        # Preprocess: resize to 224x224, to tensor [B,C,H,W]
        image = image.resize((224, 224))
        arr = np.asarray(image, dtype=np.float32) / 255.0  # [H,W,C]
        chw = np.transpose(arr, (2, 0, 1))
        tensor = torch.from_numpy(chw).unsqueeze(0)  # [1,3,224,224]

        with torch.no_grad():
            logits = _torch_model(tensor)
            probs = F.softmax(logits, dim=1).cpu().numpy()[0]
            idx = int(np.argmax(probs))
            conf = float(probs[idx])

        # Map to info via CSVs
        try:
            title = str(disease_info['disease_name'][idx])
            description = str(disease_info['description'][idx])
            prevent = str(disease_info['Possible Steps'][idx])
            image_url = str(disease_info['image_url'][idx])
            supp = {
                "name": str(supplement_info['supplement name'][idx]),
                "image": str(supplement_info['supplement image'][idx]),
                "buy_link": str(supplement_info['buy link'][idx]),
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Metadata lookup failed: {e}")

        return DiseasePrediction(
            disease_index=idx,
            disease_name=title,
            confidence=conf,
            description=description,
            prevention_steps=prevent,
            image_url=image_url,
            supplement=supp,
        )
    else:
        # Keras per-crop models path
        if not crop:
            raise HTTPException(status_code=400, detail="'crop' is required for approach=keras")
        crop_key = crop.lower()
        # allow 'potato' alias for 'patato' as used in some datasets
        if crop_key == 'potato':
            crop_key = 'patato'
        if crop_key not in crop_diseases_classes:
            raise HTTPException(status_code=400, detail=f"Unsupported crop '{crop}'. Supported: {sorted(crop_diseases_classes.keys())}")
        try:
            from tensorflow.keras.models import load_model
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"TensorFlow/Keras not available: {e}")

        pil = image.resize((224, 224))
        arr = np.asarray(pil).astype(np.float32) / 255.0
        data = arr.reshape((-1, 224, 224, 3))

        model_path = os.path.join(AGRIGO_DIR, 'models', 'DL_models', f'{crop_key}_model.h5')
        if not os.path.isfile(model_path):
            raise HTTPException(status_code=500, detail=f"Keras model not found for crop '{crop_key}'")
        model = load_model(model_path, compile=False)
        preds = model.predict(data)
        classes = crop_diseases_classes[crop_key]
        if len(classes) > 2:
            idx = int(np.argmax(preds[0]))
            conf = float(np.max(preds[0]))
        else:
            p = preds[0]
            idx = int(np.round(p)[0])
            conf = float(p[0] if idx == 1 else 1.0 - p[0])
        disease_name = classes[idx][1].replace('_', ' ')

        return DiseasePrediction(
            disease_index=idx,
            disease_name=disease_name,
            confidence=conf,
        )


@app.post(
    "/yield-and-fertilizer",
    response_model=YieldFertilizerResponse,
    summary="Recommend best crop (proxy for yield) and fertilizer",
    tags=["yield", "fertilizer"],
)
def yield_and_fertilizer(req: YieldFertilizerRequest):
    # Crop recommendation as a proxy for yield prediction (no direct yield model available)
    crop_features = np.array([
        req.N, req.P, req.K, req.temperature, req.humidity, req.ph, req.rainfall
    ]).reshape(1, -1)
    scaled = CROP_SCALER.transform(crop_features)
    crop_idx = int(CROP_MODEL.predict(scaled)[0])
    try:
        recommended_crop = crops_list[crop_idx]
    except Exception:
        # If model returns label (string) already or out of bounds, fall back gracefully
        if isinstance(crop_idx, str):
            recommended_crop = crop_idx
        else:
            recommended_crop = str(crop_idx)

    # Fertilizer recommendation expects: scaled numerics + two categorical indices
    fert_num = np.array([
        req.fert_temperature, req.fert_humidity, req.moisture,
        req.nitrogen, req.potassium, req.phosphorous
    ]).reshape(1, -1)
    fert_scaled = FERT_SCALER.transform(fert_num)

    soil_idx = soil_types.index(req.soil_type)
    crop_type_idx = crop_types.index(req.crop_type)
    cat = np.array([soil_idx, crop_type_idx]).reshape(1, -1)
    fert_item = np.concatenate([fert_scaled, cat], axis=1)

    fert_idx = int(FERT_MODEL.predict(fert_item)[0])
    fertilizer = fertilizer_classes[fert_idx] if 0 <= fert_idx < len(fertilizer_classes) else str(fert_idx)

    return YieldFertilizerResponse(
        recommended_crop=recommended_crop,
        fertilizer=fertilizer,
    )


@app.get("/health", summary="Health check", tags=["ops"])
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
