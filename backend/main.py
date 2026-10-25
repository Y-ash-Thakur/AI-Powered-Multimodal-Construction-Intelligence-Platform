"""
FastAPI Backend Application for Multimodal Construction Intelligence Platform.
Provides RESTful APIs for Safety, Crack Analysis, Valuation, Planning, Daily Logs, Weather Advisories, and Knowledge Assistant.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from schemas import (
    SafetyAnalysisRequest, SafetyAnalysisResponse,
    CrackAnalysisRequest, CrackAnalysisResponse,
    ValuationRequest, ValuationResponse,
    ProjectPlanningRequest, ProjectPlanningResponse,
    DailyLogRequest, DailyLogResponse,
    WeatherAdvisoryRequest, WeatherAdvisoryResponse,
    KnowledgeQueryRequest, KnowledgeQueryResponse
)
from ai_engine import ai_engine
from sample_data import SAMPLE_PRESETS

app = FastAPI(
    title="AI-Powered Multimodal Construction Intelligence Platform API",
    description="Full-stack decision-support API for construction safety, structural crack analysis, valuation, planning, and weather-aware execution.",
    version="1.0.0"
)

# Enable CORS for React frontend (default Vite port: 5173, and any local host)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KeyConfig(BaseModel):
    api_key: str

@app.get("/")
def read_root():
    return {
        "platform": "AI-Powered Multimodal Construction Intelligence Platform",
        "status": "Online & Operational",
        "version": "1.0.0",
        "ai_engine_mode": "Gemini Multimodal Live" if ai_engine.has_active_gemini_key() else "Autonomous Multimodal Heuristic Engine"
    }

@app.get("/api/presets")
def get_presets():
    """Retrieve pre-built demo presets for 1-click evaluation of all 7 platform modules."""
    return SAMPLE_PRESETS

@app.get("/api/config/status")
def get_config_status():
    return {
        "has_gemini_key": ai_engine.has_active_gemini_key(),
        "active_mode": "Gemini Multimodal Live" if ai_engine.has_active_gemini_key() else "Domain Expert Multimodal Simulation",
        "modules_ready": [
            "Site Safety Monitoring & PPE Detection",
            "Structural Crack Detection & Health Analysis",
            "Real Estate & Asset Valuation Appraisal",
            "Project Planning & Dynamic WBS Scheduler",
            "Daily Site Assistance & Log Generator",
            "Weather-Aware Construction Advisory",
            "Construction Knowledge & Building Code Assistant"
        ]
    }

@app.post("/api/config/key")
def update_key(cfg: KeyConfig):
    ai_engine.update_api_key(cfg.api_key)
    return {
        "success": True,
        "has_gemini_key": ai_engine.has_active_gemini_key(),
        "message": "API key configuration updated successfully."
    }

@app.post("/api/safety/analyze", response_model=SafetyAnalysisResponse)
def analyze_safety(req: SafetyAnalysisRequest):
    try:
        return ai_engine.analyze_site_safety(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Safety analysis error: {str(e)}")

@app.post("/api/crack/analyze", response_model=CrackAnalysisResponse)
def analyze_crack(req: CrackAnalysisRequest):
    try:
        return ai_engine.analyze_crack(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crack analysis error: {str(e)}")

@app.post("/api/valuation/estimate", response_model=ValuationResponse)
def estimate_valuation(req: ValuationRequest):
    try:
        return ai_engine.estimate_valuation(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Valuation estimation error: {str(e)}")

@app.post("/api/planning/generate", response_model=ProjectPlanningResponse)
def generate_project_plan(req: ProjectPlanningRequest):
    try:
        return ai_engine.generate_project_plan(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Project planning error: {str(e)}")

@app.post("/api/daily-log/generate", response_model=DailyLogResponse)
def generate_daily_log(req: DailyLogRequest):
    try:
        return ai_engine.generate_daily_log(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Daily log generation error: {str(e)}")

@app.post("/api/weather/advisory", response_model=WeatherAdvisoryResponse)
def generate_weather_advisory(req: WeatherAdvisoryRequest):
    try:
        return ai_engine.generate_weather_advisory(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather advisory error: {str(e)}")

@app.post("/api/knowledge/query", response_model=KnowledgeQueryResponse)
def query_knowledge(req: KnowledgeQueryRequest):
    try:
        return ai_engine.query_knowledge_assistant(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Knowledge query error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
