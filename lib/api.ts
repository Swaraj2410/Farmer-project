// Centralized API helpers for the Unified Agri API

// In Next.js, process.env is available at build time; declare for TS without adding Node types
declare const process: { env: Record<string, string | undefined> };
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://aadi-joshi-mmcoe-farmer.hf.space";

export type DiseaseApproach = "torch" | "keras";

export async function predictDisease(
  file: File,
  approach: DiseaseApproach = "torch",
  crop?: string
) {
  const formData = new FormData();
  formData.append("file", file);

  const params = new URLSearchParams({ approach });
  if (approach === "keras" && crop) params.append("crop", crop);

  const res = await fetch(`${API_BASE}/disease/predict?${params.toString()}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    let detail = "Prediction failed";
    try {
      const data = await res.json();
      detail = data?.detail || detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

export async function getYieldAndFertilizer(payload: any) {
  const res = await fetch(`${API_BASE}/yield-and-fertilizer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = "Recommendation failed";
    try {
      const data = await res.json();
      detail = data?.detail || detail;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

export type FertilizerMetadata = {
  soil_types: string[];
  crop_types: string[];
  fertilizer_classes: string[];
};

export async function getFertilizerOptions(): Promise<FertilizerMetadata> {
  const res = await fetch(`${API_BASE}/metadata/fertilizer-options`);
  if (!res.ok) throw new Error("Failed to load fertilizer metadata");
  return res.json();
}
