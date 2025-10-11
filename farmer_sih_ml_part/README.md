---
title: MMCOE Farmer API
emoji: 🌱
colorFrom: green
colorTo: green
sdk: docker
pinned: false
---

# SIF25 Farmer – Unified API + Apps

This repository contains two original apps and a new unified API that combines their capabilities.

- AgriGo/ – Flask app for crop/fertilizer/disease (per-crop Keras)
- Plant-Disease-Detection/ – Flask app with a 39-class PyTorch plant disease model and CSV metadata
- unified_api/ – New FastAPI service exposing two endpoints that unify both projects
- copilot-output.txt – Detailed write-up of the unified API behavior and design

## Quick start

1) Python
- Recommended: Python 3.12 (works with the unified API dependency set)

2) Install dependencies for the unified API

```powershell
pip install -r unified_api/requirements.txt
```

3) Run the unified API

```powershell
python -m uvicorn unified_api.main:app --host 0.0.0.0 --port 8000
```

Docs: http://localhost:8000/docs

### Endpoints
- POST /disease/predict — upload leaf image; returns disease info, prevention, and supplement (torch default). Optional `approach=keras&crop=<name>` to use per-crop Keras models.
- POST /yield-and-fertilizer — single JSON call that returns recommended crop (yield proxy) and fertilizer recommendation.

See `copilot-output.txt` for examples and details.

## Deploy to Hugging Face Spaces

See `DEPLOY_HF.md` for a step-by-step guide to deploy the unified API as a Docker Space and use the endpoints from your frontend.

## Notes
- Large models are tracked via Git LFS (`.gitattributes` for *.pt and *.h5). Install LFS before cloning or pushing:
  - https://git-lfs.com
  - After install: `git lfs install`
- If scikit-learn pickles are incompatible with your environment, the service retrains equivalent models from CSVs and caches them.
- TensorFlow is optional and only needed if you use `/disease/predict?approach=keras`.