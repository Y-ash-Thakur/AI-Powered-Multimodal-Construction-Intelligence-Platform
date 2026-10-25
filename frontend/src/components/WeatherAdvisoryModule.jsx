import React, { useState } from 'react';
import { 
  CloudSun, 
  Wind, 
  Thermometer, 
  CloudRain, 
  Droplets, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Compass,
  AlertOctagon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateWeatherAdvisory } from '../api';

export default function WeatherAdvisoryModule({ presets }) {
  const weatherPresets = presets?.weather || [];

  const [location, setLocation] = useState('Coastal Harbour Tower Site');
  const [tempC, setTempC] = useState(34.0);
  const [windKmh, setWindKmh] = useState(42.0);
  const [rainPct, setRainPct] = useState(15.0);
  const [humidityPct, setHumidityPct] = useState(68.0);

  const [plannedActivities, setPlannedActivities] = useState([
    'Tower Crane Heavy Lifting',
    'Ready-Mix Concrete Pouring',
    'Exterior Facade Glazing Installation',
    'Roofing Membrane Heat Welding'
  ]);

  const [loading, setLoading] = useState(false);
  const [advisoryResult, setAdvisoryResult] = useState(null);

  const allAvailableActivities = [
    'Tower Crane Heavy Lifting',
    'Ready-Mix Concrete Pouring',
    'Exterior Facade Glazing Installation',
    'Roofing Membrane Heat Welding',
    'Deep Excavation & Trenching',
    'Hot Work & Structural Steel Welding'
  ];

  const handleToggleActivity = (act) => {
    if (plannedActivities.includes(act)) {
      setPlannedActivities(plannedActivities.filter(a => a !== act));
    } else {
      setPlannedActivities([...plannedActivities, act]);
    }
  };

  const handleRunAdvisory = async () => {
    setLoading(true);
    try {
      const res = await generateWeatherAdvisory({
        location,
        temperature_c: Number(tempC),
        wind_speed_kmh: Number(windKmh),
        precipitation_chance_pct: Number(rainPct),
        humidity_pct: Number(humidityPct),
        planned_activities: plannedActivities,
      });
      setAdvisoryResult(res);
      if (res.overall_safety_index > 80) {
        confetti({ particleCount: 40, spread: 50 });
      }
    } catch (err) {
      console.error(err);
      alert('Error generating weather advisory: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (p) => {
    setLocation(p.location);
    setTempC(p.temperature_c);
    setWindKmh(p.wind_speed_kmh);
    setRainPct(p.precipitation_chance_pct);
    setHumidityPct(p.humidity_pct);
    setPlannedActivities(p.planned_activities);
    setAdvisoryResult(null);
  };

  return (
    <div className="animate-fade-in" id="weather-advisory-workspace">
      {/* Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <CloudSun size={24} color="var(--accent-purple)" />
            Weather-Aware Construction Operations Advisory
          </h2>
          <p className="section-desc">
            Evaluates atmospheric telemetry against engineering thresholds: tower crane wind shutoffs (OSHA 1926.1431), concrete evaporation and freeze rates (ACI 305R/306R), and facade safety.
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      {weatherPresets.length > 0 && (
        <div className="preset-bar">
          <span className="preset-label">
            <Compass size={14} /> Atmospheric Presets:
          </span>
          {weatherPresets.map((p, idx) => (
            <button
              key={idx}
              className="preset-chip"
              onClick={() => handleSelectPreset(p)}
              id={`preset-weather-${idx}`}
            >
              {p.preset_name} ({p.wind_speed_kmh} km/h, {p.temperature_c}°C)
            </button>
          ))}
        </div>
      )}

      <div className="grid-two-col">
        {/* Left Column: Environmental Telemetry Inputs */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={16} /> Site Location & Atmospheric Readings
          </h3>

          <div className="form-group">
            <label className="form-label">Site / Sector Location</label>
            <input 
              type="text" 
              className="form-input" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Coastal Harbour Tower Site" 
              id="input-weather-location"
            />
          </div>

          {/* Sliders for Environmental Parameters */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Wind size={14} color="var(--accent-cyan)" /> Sustained Wind Speed (km/h)
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: windKmh > 38 ? 'var(--accent-crimson)' : 'var(--accent-cyan)' }}>
                {windKmh} km/h {windKmh > 38 ? '(CRANE SHUTDOWN >38)' : ''}
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="80" 
              step="1"
              value={windKmh}
              onChange={(e) => setWindKmh(e.target.value)}
              style={{ width: '100%', accentColor: windKmh > 38 ? 'var(--accent-crimson)' : 'var(--accent-cyan)' }} 
              id="slider-wind-speed"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Thermometer size={14} color="var(--accent-amber)" /> Ambient Temperature (°C)
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: tempC > 35 ? 'var(--accent-orange)' : tempC < 4 ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}>
                {tempC}°C ({((tempC * 9/5) + 32).toFixed(1)}°F)
              </span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="50" 
              step="0.5"
              value={tempC}
              onChange={(e) => setTempC(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-amber)' }} 
              id="slider-temperature"
            />
          </div>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CloudRain size={14} color="var(--accent-blue)" /> Rain Chance (%)
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{rainPct}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={rainPct}
                onChange={(e) => setRainPct(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-blue)' }} 
                id="slider-rain-chance"
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Droplets size={14} color="var(--accent-purple)" /> Relative Humidity (%)
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{humidityPct}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="5"
                value={humidityPct}
                onChange={(e) => setHumidityPct(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent-purple)' }} 
                id="slider-humidity"
              />
            </div>
          </div>

          {/* Planned Operations Checkboxes */}
          <div className="form-group">
            <label className="form-label">Planned Trade Operations Under Review</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
              {allAvailableActivities.map((act, i) => {
                const isSelected = plannedActivities.includes(act);
                return (
                  <div 
                    key={i}
                    onClick={() => handleToggleActivity(act)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.5rem 0.75rem',
                      background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(30, 41, 59, 0.4)',
                      border: isSelected ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      color: isSelected ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected} 
                      onChange={() => {}} 
                      style={{ accentColor: 'var(--accent-amber)' }} 
                    />
                    <span>{act}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleRunAdvisory}
            disabled={loading || plannedActivities.length === 0}
            id="btn-run-weather-advisory"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Running Environmental Risk Engine...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Evaluate Weather Risk Matrix</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Advisory Status & Action Plan */}
        <div>
          {advisoryResult ? (
            <div className="glass-panel" id="weather-results-panel">
              {/* Site Composite Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className={`status-badge ${
                    advisoryResult.composite_site_condition.includes('ALERT') ? 'badge-critical' :
                    advisoryResult.composite_site_condition.includes('CAUTION') ? 'badge-warning' : 'badge-compliant'
                  }`}>
                    {advisoryResult.composite_site_condition}
                  </span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    {advisoryResult.hourly_trend_advice}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Site Safety Index</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: advisoryResult.overall_safety_index >= 80 ? 'var(--accent-emerald)' : 'var(--accent-orange)' }}>
                    {advisoryResult.overall_safety_index} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>
              </div>

              {/* Engineering Telemetry Readouts */}
              <div className="grid-two-col" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    CONCRETE CURING IMPACT (ACI 305R)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>
                    {advisoryResult.concrete_curing_impact}
                  </div>
                </div>

                <div style={{ padding: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    TOWER CRANE LIMIT STATUS (OSHA 1926.1431)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>
                    {advisoryResult.crane_limit_status}
                  </div>
                </div>
              </div>

              {/* Per-Activity Status List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem' }}>
                  Operational Directives by Trade
                </h4>

                {advisoryResult.activity_breakdowns.map((act, i) => {
                  const isSafe = act.status === 'SAFE_TO_PROCEED';
                  const isCaution = act.status === 'PROCEED_WITH_PRECAUTIONS';
                  const isSuspend = act.status === 'SUSPEND_OPERATIONS';

                  const badgeClass = isSafe ? 'badge-safe' : isCaution ? 'badge-warning' : 'badge-critical';
                  const borderCol = isSafe ? 'var(--accent-emerald)' : isCaution ? 'var(--accent-amber)' : 'var(--accent-crimson)';

                  return (
                    <div 
                      key={i}
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(15, 23, 42, 0.6)',
                        borderLeft: `4px solid ${borderCol}`,
                        borderRadius: '0 8px 8px 0',
                        borderTop: '1px solid var(--border-subtle)',
                        borderRight: '1px solid var(--border-subtle)',
                        borderBottom: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>{act.activity_name}</span>
                        <span className={`status-badge ${badgeClass}`} style={{ fontSize: '0.68rem' }}>
                          {act.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                        {act.engineering_rationale}
                      </p>

                      <div style={{ fontSize: '0.78rem', color: borderCol, fontWeight: 600 }}>
                        Directive: {act.advisory_action}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <CloudSun size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Weather Telemetry Standby</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Adjust environmental wind and temperature conditions or pick a preset on the left, then click <strong>"Evaluate Weather Risk Matrix"</strong> to generate trade-specific GO/NO-GO directives.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleRunAdvisory}
                id="btn-run-weather-init"
              >
                <Sparkles size={16} />
                <span>Run Weather Risk Advisory</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
