from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

# ==========================================
# 1. Site Safety Monitoring Schemas
# ==========================================

class BoundingBox(BaseModel):
    id: str
    label: str
    type: str  # "ppe_present", "ppe_missing", "hazard", "equipment", "structural"
    confidence: float
    box_2d: List[float]  # [ymin, xmin, ymax, xmax] in percentages (0-100)
    severity: str  # "low", "medium", "high", "critical"
    description: str

class SafetyAnalysisRequest(BaseModel):
    image_base64: Optional[str] = None
    image_name: Optional[str] = "site_photo.jpg"
    inspection_focus: Optional[str] = "General PPE & Hazard Scan"
    site_location: Optional[str] = "Sector 4 - High-Rise Core"
    additional_notes: Optional[str] = None

class SafetyAnalysisResponse(BaseModel):
    overall_status: str  # "COMPLIANT", "CAUTION_REQUIRED", "CRITICAL_HAZARDS"
    safety_score: int    # 0 to 100
    summary: str
    worker_count: int
    ppe_compliance_rate: float
    detections: List[BoundingBox]
    osha_violations: List[str]
    immediate_actions: List[str]
    audit_timestamp: str

# ==========================================
# 2. Crack Detection & Structural Schemas
# ==========================================

class CrackAnalysisRequest(BaseModel):
    image_base64: Optional[str] = None
    structure_type: str = "Reinforced Concrete Wall"
    structural_age_years: Optional[int] = 5
    load_condition: Optional[str] = "Standard Service Load"
    location_tag: Optional[str] = "Basement Column B-12"

class CrackOverlayPoint(BaseModel):
    x: float
    y: float

class CrackAnalysisResponse(BaseModel):
    crack_type: str  # "Structural Shear Crack", "Flexural Tension Crack", "Hairline / Shrinkage", "Settlement Crack"
    severity: str    # "Minor", "Moderate", "Severe / Structurally Threatening"
    structural_risk_index: int  # 0 to 100
    estimated_width_mm: float
    estimated_length_cm: float
    moisture_efflorescence_detected: bool
    displacement_observed: bool
    overlay_path: List[CrackOverlayPoint]
    potential_causes: List[str]
    remediation_recommendations: List[str]
    monitoring_protocol: str
    urgency_level: str  # "Routine Maintenance", "Urgent Inspection within 48h", "Immediate Shoring Required"

# ==========================================
# 3. Real Estate Valuation Schemas
# ==========================================

class ValuationRequest(BaseModel):
    property_name: Optional[str] = "Apex Commercial Tower"
    property_type: str = "Commercial Office"  # "Commercial Office", "Residential High-Rise", "Industrial Warehouse", "Luxury Villa"
    built_up_area_sqft: float = 25000.0
    location_tier: str = "Tier 1 - Urban Metro Prime"  # "Tier 1 - Urban Metro Prime", "Tier 2 - Suburban Growth Hub", "Tier 3 - Industrial Corridor"
    structural_material: str = "Cast-in-Place Reinforced Concrete"
    construction_quality: str = "Premium / Grade A"
    age_years: int = 2
    completion_percentage: float = 100.0

class ValueDriver(BaseModel):
    factor: str
    impact_percentage: float
    rationale: str

class ValuationResponse(BaseModel):
    estimated_value_usd: float
    valuation_range_low: float
    valuation_range_high: float
    price_per_sqft: float
    replacement_cost_usd: float
    depreciation_usd: float
    market_confidence_score: float
    cost_breakdown: Dict[str, float]
    key_drivers: List[ValueDriver]
    comparable_benchmarks: List[Dict[str, Any]]
    valuation_summary: str

# ==========================================
# 4. Project Planning & WBS Schemas
# ==========================================

class ProjectPlanningRequest(BaseModel):
    project_name: str = "Metropolitan Gateway Hub"
    building_type: str = "Multi-Storey Mixed Use (Commercial & Retail)"
    total_area_sqft: float = 85000.0
    budget_estimate_usd: float = 15000000.0
    target_duration_months: int = 18
    site_constraints: Optional[str] = "Dense urban area, nighttime noise restrictions"

class PhaseMilestone(BaseModel):
    id: str
    phase_name: str
    start_day: int
    end_day: int
    progress_percent: int
    estimated_cost_usd: float
    crew_types: List[str]
    equipment: List[str]
    deliverables: List[str]
    key_risks: List[str]

class RiskMatrixItem(BaseModel):
    risk_title: str
    probability: str  # "Low", "Medium", "High"
    impact: str       # "Low", "Medium", "High", "Critical"
    mitigation_strategy: str

class ProjectPlanningResponse(BaseModel):
    project_summary: str
    total_duration_days: int
    critical_path_summary: str
    phases: List[PhaseMilestone]
    resource_allocation: Dict[str, Any]
    risk_matrix: List[RiskMatrixItem]
    productivity_kpi_targets: Dict[str, str]

# ==========================================
# 5. Daily Site Assistance Schemas
# ==========================================

class SubcontractorCount(BaseModel):
    trade: str
    worker_count: int

class DailyLogRequest(BaseModel):
    date: str = "2026-10-25"
    project_name: str = "Horizon Skyline Tower"
    shift: str = "Day Shift (07:00 - 16:30)"
    weather_summary: str = "Clear, 24°C, Wind 12 km/h"
    subcontractors: List[SubcontractorCount] = [
        SubcontractorCount(trade="Structural Concrete & Rebar", worker_count=32),
        SubcontractorCount(trade="Electrical & Conduit Rough-in", worker_count=14),
        SubcontractorCount(trade="Mechanical & HVAC Ductwork", worker_count=18),
        SubcontractorCount(trade="Safety & Traffic Marshals", worker_count=4)
    ]
    activities_completed: List[str] = [
        "Poured 180 m³ ready-mix concrete on Level 7 floor plate",
        "Completed post-tensioning duct placement on Bay C",
        "Passed MEP sleeve inspection by local municipal inspector"
    ]
    safety_incidents: Optional[str] = "Zero recordable incidents. 1 near-miss resolved: loose toe-board secured on scaffolding."
    delays_encountered: Optional[str] = "35-minute delay on Concrete Pump Truck #2 due to traffic rerouting."

class DailyLogResponse(BaseModel):
    log_reference_id: str
    executive_narrative: str
    total_workers_on_site: int
    total_man_hours: float
    productivity_rating: str
    safety_audit_status: str
    resolved_delays: str
    material_deliveries_summary: List[str]
    tomorrow_priorities: List[str]
    supervisor_signoff_badge: str

# ==========================================
# 6. Weather-Aware Advisory Schemas
# ==========================================

class WeatherAdvisoryRequest(BaseModel):
    location: str = "Site A - Metro Zone"
    temperature_c: float = 34.0
    wind_speed_kmh: float = 42.0
    precipitation_chance_pct: float = 15.0
    humidity_pct: float = 68.0
    planned_activities: List[str] = [
        "Tower Crane Heavy Lifting",
        "Ready-Mix Concrete Pouring",
        "Exterior Facade Glazing Installation",
        "Roofing Membrane Heat Welding"
    ]

class ActivityWeatherStatus(BaseModel):
    activity_name: str
    status: str  # "SAFE_TO_PROCEED", "PROCEED_WITH_PRECAUTIONS", "SUSPEND_OPERATIONS"
    risk_level: str  # "Low", "Moderate", "Critical"
    engineering_rationale: str
    advisory_action: str

class WeatherAdvisoryResponse(BaseModel):
    composite_site_condition: str  # "ALERT: Extreme Wind & High Heat", "FAVORABLE", "MARGINAL"
    overall_safety_index: int      # 0 to 100
    hourly_trend_advice: str
    activity_breakdowns: List[ActivityWeatherStatus]
    concrete_curing_impact: str
    crane_limit_status: str

# ==========================================
# 7. Knowledge & Building Code Assistant Schemas
# ==========================================

class KnowledgeQueryRequest(BaseModel):
    query: str
    domain: Optional[str] = "General Building Codes & Standards"  # "OSHA Safety", "ACI Concrete", "IBC International Building Code", "MEP & Electrical"

class KnowledgeQueryResponse(BaseModel):
    query: str
    domain: str
    structured_answer: str
    cited_standards: List[str]
    inspection_checklist: List[str]
    safety_precautions: List[str]
    recommended_follow_ups: List[str]
