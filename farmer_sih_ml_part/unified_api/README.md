# Unified Agri API

This service unifies two existing apps into one HTTP API with OpenAPI docs:
- Plant-Disease-Detection (PyTorch 39-class classifier + disease metadata and supplements)
- AgriGo (scikit-learn crop recommendation + fertilizer recommendation)

It exposes two endpoints:
- POST /disease/predict: multipart/form-data with `file` (image). Returns predicted disease, confidence, description, prevention steps, and recommended supplement.
- POST /yield-and-fertilizer: JSON body with agronomic parameters. Returns recommended crop (as a proxy for yield) and fertilizer.

OpenAPI docs available at `/docs` and `/openapi.json` when running.

## Project layout

- `unified_api/main.py` - FastAPI app
- Reuses assets from:
  - `AgriGo/AgriGo/models/ML_models/*` (scalers and models)
  - `Plant-Disease-Detection/Flask Deployed App/*` (CSV metadata, Torch model and CNN class)

## Run locally

1. (Optional) Create and activate a virtual env.
2. Install deps:

```powershell
pip install -r unified_api/requirements.txt
```

3. Start the API:

```powershell
python -m uvicorn unified_api.main:app --host 0.0.0.0 --port 8000
```

4. Open docs at http://localhost:8000/docs

## Requests

Example: disease prediction

```bash
curl -X POST http://localhost:8000/disease/predict -F "file=@Plant-Disease-Detection/test_images/apple_healthy.JPG"
```

Example: yield + fertilizer

```bash
curl -X POST http://localhost:8000/yield-and-fertilizer -H "Content-Type: application/json" -d '{
  "N": 90, "P": 42, "K": 43, "temperature": 21, "humidity": 82, "ph": 6.5, "rainfall": 202,
  "fert_temperature": 26, "fert_humidity": 52, "moisture": 38, "soil_type": "Sandy", "crop_type": "Maize",
  "nitrogen": 37, "potassium": 0, "phosphorous": 0
}'
```

## Notes
- The repo includes separate Flask apps; this API doesn’t modify them, it only reuses their models/metadata.
- Yield prediction: there is no explicit yield model in the codebase; the service recommends the best crop via the existing crop recommendation model as a proxy.
- If you later add a true yield model, wire it into `unified_api/main.py` and extend the response schema accordingly.
