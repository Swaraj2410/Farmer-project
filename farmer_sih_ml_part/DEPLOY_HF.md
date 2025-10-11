# Deploy to Hugging Face Spaces (Docker)

This guide deploys the unified FastAPI service in `unified_api/` to a single Hugging Face Space so your frontend can call its endpoints.

## What gets deployed
- Service: `unified_api.main:app` (FastAPI)
- Endpoints:
  - POST `/disease/predict` (multipart/form-data with `file`)
  - POST `/yield-and-fertilizer` (JSON)
  - GET `/metadata/fertilizer-options`
  - GET `/health`
- Models/assets used at runtime (paths must remain the same):
  - `Plant-Disease-Detection/Flask Deployed App/plant_disease_model_1_latest.pt`
  - `Plant-Disease-Detection/Flask Deployed App/CNN.py`
  - `Plant-Disease-Detection/Flask Deployed App/disease_info.csv`
  - `Plant-Disease-Detection/Flask Deployed App/supplement_info.csv`
  - `AgriGo/AgriGo/models/ML_models/*` (scalers and models)

Note: TensorFlow is not included by default to keep the image small; the `approach=keras` path of `/disease/predict` will not be available unless you add TF to `unified_api/requirements.txt` and rebuild.

## Prerequisites
- Git installed, and Git LFS installed and initialized
- A Hugging Face account (https://huggingface.co)

## 1) Initialize Git LFS and track large files
From the repo root:

```powershell
# One-time on your machine
git lfs install

# Ensure attributes are picked up (already added by .gitattributes)
git add .gitattributes
```

If the large model files are not already tracked by LFS on your clone, run:

```powershell
git lfs track "*.pt"
git lfs track "*.h5"
git lfs track "*.pkl"
```

Commit changes:

```powershell
git add .
git commit -m "Prepare for HF Spaces: Dockerfile + LFS + docs"
```

## 2) Create a new Space
- Go to https://huggingface.co/new-space
- Space type: “Docker”
- Hardware: CPU Basic (sufficient), enable "Always on" only if needed
- Set visibility private/public as you prefer
- Create Space

## 3) Push code to the Space
You’ll see a Git endpoint like `https://huggingface.co/spaces/<org-or-user>/<space-name>`.

Add it as a remote and push:

```powershell
# Replace these
$SPACE="https://huggingface.co/spaces/<org-or-user>/<space-name>"

# Add as a remote
git remote add hf $SPACE

# Push including LFS-tracked files
git push hf main
```

The Space will build automatically using the root `Dockerfile`.

## 4) Verify it’s running
- Open the Space URL.
- The API will serve on the Space URL base; FastAPI docs are available at:
  - `https://<org-or-user>-<space-name>.hf.space/docs`
- Health check: `https://<org-or-user>-<space-name>.hf.space/health` should return `{ "status": "ok" }`.

## 5) Try the endpoints
- Image disease prediction:
  - POST multipart form with `file` to `/disease/predict`.
- Crop + fertilizer:
  - POST JSON to `/yield-and-fertilizer`.

Example PowerShell (adjust Space URL and image path):

```powershell
$BASE = "https://<org-or-user>-<space-name>.hf.space"

# Health
curl "$BASE/health"

# Disease predict (multipart)
$img = "Plant-Disease-Detection/test_images/apple_healthy.JPG"
Invoke-WebRequest -Uri "$BASE/disease/predict" -Method POST -Form @{ file = Get-Item $img } | Select-Object -ExpandProperty Content

# Yield + fertilizer
$body = '{
  "N": 90, "P": 42, "K": 43, "temperature": 21, "humidity": 82, "ph": 6.5, "rainfall": 202,
  "fert_temperature": 26, "fert_humidity": 52, "moisture": 38, "soil_type": "Sandy", "crop_type": "Maize",
  "nitrogen": 37, "potassium": 0, "phosphorous": 0
}'
Invoke-RestMethod -Uri "$BASE/yield-and-fertilizer" -Method POST -ContentType 'application/json' -Body $body
```

## 6) Frontend usage
- From your hosted frontend, call the Space endpoints directly (CORS is already permissive in the FastAPI app):
  - `POST ${BASE}/disease/predict` with FormData including the image file
  - `POST ${BASE}/yield-and-fertilizer` with JSON body

## Notes / Troubleshooting
- Build failures about large files: ensure Git LFS is installed and you pushed with LFS.
- Slow cold start: initial import of torch and model load is heavy; subsequent calls are faster.
- If you need the Keras path (`approach=keras`): add `tensorflow-cpu` to `unified_api/requirements.txt`, push again. Expect larger image and longer build times.
- If your Space sleeps due to inactivity and you need always-on behavior, enable the “Always on” option or consider Inference Endpoints.
