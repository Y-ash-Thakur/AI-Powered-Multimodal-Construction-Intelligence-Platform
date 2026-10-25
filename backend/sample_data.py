"""
Sample Presets and Demo Assets for Multimodal Construction Intelligence Platform.
Contains rich mock data, SVG image previews, and real-world construction presets.
"""

# Rich SVG demo images encoded as data URIs for immediate 1-click testing
SAMPLE_SAFETY_IMAGE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="60%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="concGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <pattern id="rebarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#713f12" stroke-width="1.5"/>
    </pattern>
  </defs>

  <!-- Sky & Horizon -->
  <rect width="800" height="300" fill="url(#skyGrad)"/>
  
  <!-- Distant Cranes -->
  <path d="M 650 30 L 650 250 M 650 60 L 520 60 M 650 60 L 750 80 M 650 30 L 580 60" stroke="#f59e0b" stroke-width="3" fill="none"/>
  <line x1="560" y1="60" x2="560" y2="140" stroke="#334155" stroke-width="1.5" stroke-dasharray="2,2"/>
  <rect x="550" y="140" width="20" height="15" fill="#f59e0b"/>

  <!-- Concrete Structure & Slabs -->
  <rect x="80" y="120" width="360" height="240" fill="url(#concGrad)" stroke="#334155" stroke-width="3"/>
  <rect x="60" y="110" width="400" height="20" fill="#475569"/>
  <rect x="60" y="230" width="400" height="18" fill="#475569"/>
  <rect x="40" y="350" width="720" height="150" fill="#334155"/>
  
  <!-- Rebar Mesh Section -->
  <rect x="110" y="140" width="120" height="80" fill="url(#rebarGrid)" opacity="0.6"/>

  <!-- Scaffolding Frame -->
  <g stroke="#94a3b8" stroke-width="3.5" fill="none">
    <line x1="470" y1="110" x2="470" y2="350"/>
    <line x1="550" y1="110" x2="550" y2="350"/>
    <line x1="470" y1="160" x2="550" y2="160"/>
    <line x1="470" y1="230" x2="550" y2="230"/>
    <line x1="470" y1="300" x2="550" y2="300"/>
    <!-- Cross Bracing -->
    <line x1="470" y1="160" x2="550" y2="230" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="550" y1="160" x2="470" y2="230" stroke="#cbd5e1" stroke-width="2"/>
  </g>
  <rect x="460" y="225" width="100" height="10" fill="#d97706"/>

  <!-- Worker 1 (Compliant: Hard Hat, High-Vis Vest, Safety Harness) -->
  <g transform="translate(180, 250)">
    <!-- Body -->
    <rect x="-14" y="25" width="28" height="45" rx="4" fill="#f97316"/> <!-- High-vis vest -->
    <rect x="-10" y="32" width="6" height="30" fill="#e2e8f0"/> <!-- Reflective tape -->
    <rect x="4" y="32" width="6" height="30" fill="#e2e8f0"/>
    <!-- Legs -->
    <rect x="-12" y="70" width="10" height="40" fill="#1e293b"/>
    <rect x="2" y="70" width="10" height="40" fill="#1e293b"/>
    <!-- Boots -->
    <rect x="-15" y="105" width="14" height="8" rx="2" fill="#78350f"/>
    <rect x="1" y="105" width="14" height="8" rx="2" fill="#78350f"/>
    <!-- Head & Hard Hat -->
    <circle cx="0" cy="12" r="10" fill="#fdba74"/>
    <path d="M -13 8 C -13 0, 13 0, 13 8 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/> <!-- Yellow Hard Hat -->
    <rect x="-16" y="7" width="32" height="3" rx="1.5" fill="#f59e0b"/>
  </g>

  <!-- Worker 2 (VIOLATION: Missing Hard Hat, Unsecured at Heights) -->
  <g transform="translate(495, 145)">
    <!-- Body (No High-Vis) -->
    <rect x="-12" y="22" width="24" height="40" rx="3" fill="#3b82f6"/> <!-- Regular blue jacket -->
    <!-- Legs -->
    <rect x="-10" y="62" width="9" height="30" fill="#475569"/>
    <rect x="1" y="62" width="9" height="30" fill="#475569"/>
    <!-- Head (Dark Hair, NO Hard Hat) -->
    <circle cx="0" cy="10" r="9" fill="#fed7aa"/>
    <path d="M -9 8 Q 0 -2 9 8 Q 5 2 -9 8" fill="#1c1917"/> <!-- Hair only, no helmet -->
  </g>

  <!-- Ground Trip Hazard (Loose Cables & Debris) -->
  <path d="M 280 375 Q 320 360, 360 380 T 430 370" fill="none" stroke="#ef4444" stroke-width="4"/>
  <rect x="330" y="370" width="22" height="16" fill="#78350f" transform="rotate(15, 330, 370)"/>

  <!-- Construction Sign -->
  <rect x="620" y="290" width="110" height="70" fill="#fef08a" stroke="#ca8a04" stroke-width="3" rx="4"/>
  <text x="675" y="315" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#854d0e" text-anchor="middle">CAUTION</text>
  <text x="675" y="335" font-family="Arial, sans-serif" font-size="10" fill="#1e293b" text-anchor="middle">HARD HAT AREA</text>
  <line x1="675" y1="360" x2="675" y2="420" stroke="#475569" stroke-width="5"/>
</svg>"""

SAMPLE_CRACK_IMAGE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.5   0 0 0 0 0.5   0 0 0 0 0.5  0 0 0 0.15 0"/>
      <feBlend mode="multiply" in2="SourceGraphic"/>
    </filter>
    <linearGradient id="wallBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  </defs>

  <!-- Concrete Wall Base -->
  <rect width="800" height="500" fill="url(#wallBase)"/>
  
  <!-- Surface Texture Lines & Formwork Seams -->
  <line x1="0" y1="160" x2="800" y2="160" stroke="#475569" stroke-width="2" opacity="0.4"/>
  <line x1="0" y1="340" x2="800" y2="340" stroke="#475569" stroke-width="2" opacity="0.4"/>
  <circle cx="200" cy="80" r="12" fill="#475569" opacity="0.3"/>
  <circle cx="600" cy="80" r="12" fill="#475569" opacity="0.3"/>
  <circle cx="200" cy="250" r="12" fill="#475569" opacity="0.3"/>
  <circle cx="600" cy="250" r="12" fill="#475569" opacity="0.3"/>
  <circle cx="200" cy="420" r="12" fill="#475569" opacity="0.3"/>
  <circle cx="600" cy="420" r="12" fill="#475569" opacity="0.3"/>

  <!-- Efflorescence / Moisture Leaching Stains -->
  <path d="M 360 140 Q 380 220 370 300 Q 430 310 400 220 Z" fill="#f8fafc" opacity="0.35"/>
  <path d="M 330 240 Q 350 320 330 390 Q 370 410 380 300 Z" fill="#475569" opacity="0.25"/>

  <!-- Major Structural Shear Crack -->
  <!-- Shadow/Dark inner fissure -->
  <path d="M 280 40 
           L 305 90 
           L 320 135 
           L 310 170 
           L 355 230 
           L 380 290 
           L 370 340 
           L 415 410 
           L 435 460" 
        fill="none" stroke="#0f172a" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        
  <!-- Mid-depth fissure -->
  <path d="M 280 40 
           L 305 90 
           L 320 135 
           L 310 170 
           L 355 230 
           L 380 290 
           L 370 340 
           L 415 410 
           L 435 460" 
        fill="none" stroke="#334155" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Hairline Micro-Cracks Branching Out -->
  <path d="M 355 230 L 410 215 L 435 225" fill="none" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M 320 135 L 265 155 L 240 150" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M 380 290 L 440 330 L 470 350" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
  <path d="M 415 410 L 370 435 L 340 440" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Metric Reference Scale Bar (Engineering Ruler) -->
  <g transform="translate(620, 360)">
    <rect x="0" y="0" width="130" height="30" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5"/>
    <text x="65" y="20" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">SCALE: 10 cm</text>
    <line x1="15" y1="24" x2="115" y2="24" stroke="#0f172a" stroke-width="2"/>
    <line x1="15" y1="18" x2="15" y2="24" stroke="#0f172a" stroke-width="2"/>
    <line x1="115" y1="18" x2="115" y2="24" stroke="#0f172a" stroke-width="2"/>
  </g>
</svg>"""

# High-fidelity Presets
SAMPLE_PRESETS = {
    "safety": {
        "title": "Tower A - Level 4 Deck Inspection",
        "site_location": "Bay 3, High-Rise Core East",
        "inspection_focus": "PPE Compliance & Scaffolding Fall Hazard Check",
        "sample_svg": SAMPLE_SAFETY_IMAGE_SVG,
        "notes": "Routine morning audit prior to post-tension concrete pour."
    },
    "crack": {
        "title": "Basement Shear Wall B-12",
        "structure_type": "Reinforced Concrete Foundation Shear Wall",
        "structural_age_years": 8,
        "load_condition": "Full Hydrostatic Ground Pressure & Dead Load",
        "location_tag": "Sub-grade Basement Level -2",
        "sample_svg": SAMPLE_CRACK_IMAGE_SVG
    },
    "valuation": [
        {
            "name": "The Obsidian Commercial Tower",
            "property_type": "Commercial Office",
            "built_up_area_sqft": 65000,
            "location_tier": "Tier 1 - Urban Metro Prime",
            "structural_material": "Steel Frame & Post-Tensioned Concrete",
            "construction_quality": "Premium / Grade A",
            "age_years": 1,
            "completion_percentage": 100
        },
        {
            "name": "Skyline Logistics Mega-Hub",
            "property_type": "Industrial Warehouse",
            "built_up_area_sqft": 140000,
            "location_tier": "Tier 3 - Industrial Corridor",
            "structural_material": "Precast Concrete & Insulated Metal Panels",
            "construction_quality": "High-Efficiency Standard",
            "age_years": 3,
            "completion_percentage": 100
        },
        {
            "name": "Emerald Heights Residences",
            "property_type": "Residential High-Rise",
            "built_up_area_sqft": 92000,
            "location_tier": "Tier 2 - Suburban Growth Hub",
            "structural_material": "Cast-in-Place Reinforced Concrete",
            "construction_quality": "Luxury Residential Finishes",
            "age_years": 0,
            "completion_percentage": 82
        }
    ],
    "planning": [
        {
            "name": "Aura Metropark Mixed-Use Center",
            "building_type": "Multi-Storey Mixed Use (Commercial & Retail)",
            "total_area_sqft": 120000,
            "budget_estimate_usd": 24500000,
            "target_duration_months": 20,
            "site_constraints": "Adjacent to light rail line, restricted heavy vehicle delivery hours (09:00 - 15:00)"
        },
        {
            "name": "Crestview Multi-Family Tower",
            "building_type": "Residential High-Rise",
            "total_area_sqft": 75000,
            "budget_estimate_usd": 14000000,
            "target_duration_months": 15,
            "site_constraints": "Deep basement excavation near water table, dewatering system required"
        }
    ],
    "weather": [
        {
            "preset_name": "High Wind Warning (Crane Advisory)",
            "location": "Coastal Harbour Tower Site",
            "temperature_c": 22.0,
            "wind_speed_kmh": 46.5,
            "precipitation_chance_pct": 20.0,
            "humidity_pct": 72.0,
            "planned_activities": [
                "Tower Crane Heavy Lifting",
                "Exterior Facade Glazing Installation",
                "Roofing Membrane Heat Welding"
            ]
        },
        {
            "preset_name": "Extreme Heat Wave (Concrete Advisory)",
            "location": "Desert Vista Phase 2",
            "temperature_c": 39.5,
            "wind_speed_kmh": 14.0,
            "precipitation_chance_pct": 0.0,
            "humidity_pct": 28.0,
            "planned_activities": [
                "Ready-Mix Concrete Pouring",
                "Structural Steel Erection",
                "Worker Outdoor Rebar Tying"
            ]
        },
        {
            "preset_name": "Optimal Construction Window",
            "location": "Metro Central Station",
            "temperature_c": 21.0,
            "wind_speed_kmh": 11.0,
            "precipitation_chance_pct": 5.0,
            "humidity_pct": 52.0,
            "planned_activities": [
                "Tower Crane Heavy Lifting",
                "Ready-Mix Concrete Pouring",
                "Exterior Facade Glazing Installation",
                "Roofing Membrane Heat Welding"
            ]
        }
    ],
    "knowledge_prompts": [
        "What is the maximum permissible wind speed for operating a hammerhead tower crane under OSHA 1926.1431?",
        "According to ACI 318-19, what is the minimum concrete cover thickness for cast-in-place rebar exposed to earth?",
        "What are the mandatory fall arrest requirements for workers on scaffolding above 10 feet under OSHA 1926.451?",
        "How does ambient temperature above 35°C affect Portland cement hydration, and what retarders are required by ACI 305R?",
        "What are the IBC 2024 Chapter 10 requirements for egress staircase minimum width in multi-storey commercial buildings?"
    ]
}
