# Hugging Face Spaces (Docker) image for Unified Agri API
# - Runs FastAPI app in unified_api/main.py
# - Copies the entire repo to preserve expected relative paths to models/CSVs

FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    UVICORN_WORKERS=1

WORKDIR /app

# System deps (minimal). Uncomment if you hit pillow libjpeg issues.
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     libglib2.0-0 \
#     && rm -rf /var/lib/apt/lists/*

# Copy repo
COPY . /app

# Install only the API requirements to keep image smaller than the older Flask apps
RUN pip install --upgrade pip && \
    pip install -r unified_api/requirements.txt

# Hugging Face Spaces injects the PORT env var
ENV PORT=7860

EXPOSE 7860

# Start the FastAPI app (use shell to expand $PORT provided by HF Spaces)
CMD ["sh", "-c", "python -m uvicorn unified_api.main:app --host 0.0.0.0 --port ${PORT:-7860}"]
