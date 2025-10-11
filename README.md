Frontend API configuration

- The app calls a unified backend deployed on Hugging Face Spaces.
- Configure the base URL via env var:
	- NEXT_PUBLIC_API_BASE (default used if not set: https://aadi-joshi-mmcoe-farmer.hf.space)

Endpoints expected by the frontend

- POST /disease/predict (multipart/form-data, field name: file)
- POST /yield-and-fertilizer (application/json)
- GET /metadata/fertilizer-options

Interactive backend docs: https://aadi-joshi-mmcoe-farmer.hf.space/docs

Local development

- You can run the backend locally at http://localhost:8000 and override the base URL by creating `.env.local` with:

	NEXT_PUBLIC_API_BASE=http://localhost:8000

...
