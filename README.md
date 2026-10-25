# BuildIQ: AI-Powered Multimodal Construction Intelligence Platform

**BuildIQ** is a full-stack, multimodal artificial intelligence decision-support platform engineered for construction superintendents, structural engineers, cost estimators, and project executives.

---

## 🌟 Key Capabilities

1. **🦺 Construction Site Safety & PPE Monitoring**
   - Multimodal computer vision scan for personal protective equipment (Class E hard hats, ANSI high-vis vests).
   - Elevated fall protection hazard detection on scaffolding and trench perimeters.
   - Ground trip obstacle identification.
   - Automated citations from **OSHA 29 CFR 1926** with actionable, tickable superintendent field directives.
   - Interactive bounding box viewport with percentage coordinates and confidence indicators.

2. **🧱 Crack Detection & Structural Health Analysis**
   - Diagnostic fracture mapping with glowing visual telemetry overlay.
   - Sub-millimeter aperture width estimation (`mm`) and trajectory length (`cm`).
   - Leaching efflorescence and water ingress risk alerts.
   - Engineering failure mode hypotheses and **ACI 224R** structural repair specifications (epoxy pressure injection, CFRP wrapping).

3. **💰 Real Estate & Construction Asset Valuation**
   - Algorithmic appraisal engine implementing Marshall & Swift replacement-cost and physical depreciation models.
   - Interactive parameters for structural materials, finishes specification grade, location tiers, and completion percentage.
   - Granular cost breakdown: Substructure, MEP/HVAC smart systems, Architectural finishes, Land/permitting.
   - Statistical confidence rating and comparable market transaction comps.

4. **📅 Construction Project Planning & Dynamic WBS Scheduler**
   - Automated 5-phase Work Breakdown Structure (Site Prep & Foundations, Concrete Superstructure Framing, Building Envelope & Facade, MEP & Life Safety, Fit-out & Handover).
   - Interactive Gantt timeline visualization with milestone deliverables and equipment requirements.
   - Critical path duration tracking, peak trade crew headcount, and concrete/steel volume estimations.
   - Proactive risk matrix with probability, impact, and engineering mitigations.

5. **📋 Daily Site Assistant & Executive Log Generator**
   - Trade workforce manpower tracking (rebar ironworkers, electricians, HVAC mechanics, safety marshals).
   - Automatic man-hour calculations (`sum * 8.5h shift base`) and productivity index.
   - Safety audit clearance badges and delivery logs.
   - Export-ready verified daily log narrative with **One-Click Markdown Copy** and **Print/PDF View**.

6. **⛅ Weather-Aware Operations Advisory**
   - Live telemetry evaluation for sustained wind gusts, ambient temperature, precipitation, and relative humidity.
   - Strict engineering thresholds:
     - **OSHA 1926.1431 / ASME B30.3**: Tower crane shutdowns for wind speeds > 38 km/h.
     - **ACI 305R**: Hot weather concrete rapid evaporation and plastic shrinkage mitigation.
     - **ACI 306R**: Cold weather freezing risk and hydronic curing requirements.
   - Trade-specific GO / CAUTION / SUSPEND directives with engineering rationale.

7. **🧠 Construction Knowledge & Building Code Assistant**
   - Domain-focused technical consultation engine over **OSHA 1926**, **ACI 318-19**, **IBC 2024**, and **NFPA Life Safety**.
   - Suggested 1-click engineering queries (tower crane wind limits, rebar concrete cover, scaffolding trigger heights).
   - Rich technical responses with standard clause citations, field inspection checklists, and safety precautions.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React.js with Vite, Vanilla CSS design system (dark industrial aesthetic with safety amber/orange/cyan accents, glassmorphism cards, micro-animations, canvas bounding box overlays).
- **Backend**: FastAPI (Python 3.14+), Uvicorn, Pydantic strict JSON schema contracts.
- **Multimodal AI Engine**:
  - Autonomous Domain Expert Multimodal Simulation Core (100% offline uptime, zero setup needed).
  - Optional Google Gemini Multimodal LLM integration for live reasoning over custom site imagery.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Start the FastAPI Backend
```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be available at: `http://127.0.0.1:8000/docs`

### 2. Start the React Frontend
```bash
cd frontend
npm run dev
```
Open your browser at: `http://127.0.0.1:5173/`

### 3. One-Click Launcher (Windows)
Double-click `run.bat` in the project root to start both servers simultaneously.
