import React, { useState } from 'react';
import { 
  CalendarRange, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Truck, 
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateProjectPlan } from '../api';

export default function ProjectPlanningModule({ presets }) {
  const planningPresets = presets?.planning || [];

  const [projectName, setProjectName] = useState('Metropolitan Gateway Hub');
  const [buildingType, setBuildingType] = useState('Multi-Storey Mixed Use (Commercial & Retail)');
  const [totalAreaSqft, setTotalAreaSqft] = useState(85000);
  const [budgetEstimateUsd, setBudgetEstimateUsd] = useState(15000000);
  const [targetDurationMonths, setTargetDurationMonths] = useState(18);
  const [siteConstraints, setSiteConstraints] = useState('Dense urban area, nighttime noise restrictions');

  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);
  const [expandedPhaseId, setExpandedPhaseId] = useState('PH-2');

  const handleRunPlanning = async () => {
    setLoading(true);
    try {
      const res = await generateProjectPlan({
        project_name: projectName,
        building_type: buildingType,
        total_area_sqft: Number(totalAreaSqft),
        budget_estimate_usd: Number(budgetEstimateUsd),
        target_duration_months: Number(targetDurationMonths),
        site_constraints: siteConstraints,
      });
      setPlanResult(res);
      confetti({ particleCount: 50, spread: 60 });
    } catch (err) {
      console.error(err);
      alert('Error generating project plan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (p) => {
    setProjectName(p.name);
    setBuildingType(p.building_type);
    setTotalAreaSqft(p.total_area_sqft);
    setBudgetEstimateUsd(p.budget_estimate_usd);
    setTargetDurationMonths(p.target_duration_months);
    setSiteConstraints(p.site_constraints);
    setPlanResult(null);
  };

  return (
    <div className="animate-fade-in" id="project-planning-workspace">
      {/* Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <CalendarRange size={24} color="var(--accent-amber)" />
            Construction Project Planning & WBS Generator
          </h2>
          <p className="section-desc">
            Automates 5-phase Work Breakdown Structures, calculates critical path duration, allocates trade labor and heavy equipment, and builds proactive risk matrices.
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      {planningPresets.length > 0 && (
        <div className="preset-bar">
          <span className="preset-label">
            <Layers size={14} /> Planning Templates:
          </span>
          {planningPresets.map((p, idx) => (
            <button
              key={idx}
              className="preset-chip"
              onClick={() => handleSelectPreset(p)}
              id={`preset-plan-${idx}`}
            >
              {p.name} ({p.target_duration_months} Months)
            </button>
          ))}
        </div>
      )}

      <div className="grid-two-col">
        {/* Left Column: Planning Inputs */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} /> Scope & Constraint Specifications
          </h3>

          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Metropolitan Gateway Hub" 
              id="input-plan-name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Building / Structure Classification</label>
            <select 
              className="form-select"
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              id="select-plan-building-type"
            >
              <option value="Multi-Storey Mixed Use (Commercial & Retail)">Multi-Storey Mixed Use (Commercial & Retail)</option>
              <option value="Residential High-Rise">Residential High-Rise</option>
              <option value="Industrial Logistics Warehouse">Industrial Logistics Warehouse</option>
              <option value="Infrastructure / Viaduct Bridge">Infrastructure / Viaduct Bridge</option>
            </select>
          </div>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Total Built-Up Area (sq. ft)</label>
              <input 
                type="number" 
                className="form-input" 
                value={totalAreaSqft}
                onChange={(e) => setTotalAreaSqft(e.target.value)}
                id="input-plan-area"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Budget Allocation ($ USD)</label>
              <input 
                type="number" 
                className="form-input" 
                value={budgetEstimateUsd}
                onChange={(e) => setBudgetEstimateUsd(e.target.value)}
                id="input-plan-budget"
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Target Duration (Months)</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                {targetDurationMonths} Months ({targetDurationMonths * 30} Days)
              </span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="48" 
              step="1"
              value={targetDurationMonths}
              onChange={(e) => setTargetDurationMonths(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-amber)' }} 
              id="slider-plan-duration"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Site Logistics & Regulatory Constraints</label>
            <textarea 
              className="form-textarea"
              rows={2}
              value={siteConstraints}
              onChange={(e) => setSiteConstraints(e.target.value)}
              placeholder="e.g. Urban traffic corridor, tower crane swing permit constraints" 
              id="textarea-plan-constraints"
            />
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleRunPlanning}
            disabled={loading}
            id="btn-run-planning"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Generating Synchronized WBS...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Synthesize Construction Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Dynamic Gantt & Resource Allocation */}
        <div>
          {planResult ? (
            <div className="glass-panel" id="planning-results-panel">
              {/* Executive Summary & Duration */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="status-badge badge-compliant">
                    Schedule Synthesized
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    Critical Path Duration: <strong style={{ color: '#fff' }}>{planResult.total_duration_days} Days</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Spend</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    ${(budgetEstimateUsd / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>

              {/* Resource Allocation Highlights */}
              <div className="grid-three-col" style={{ marginBottom: '1.25rem' }}>
                <div className="metric-card">
                  <div className="metric-label">Peak Crew</div>
                  <div className="metric-value" style={{ fontSize: '1.25rem' }}>
                    {planResult.resource_allocation.peak_headcount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>trades</span>
                  </div>
                  <div className="metric-subtext">Peak site manpower</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Concrete Req.</div>
                  <div className="metric-value" style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }}>
                    {Number(planResult.resource_allocation.estimated_concrete_volume_m3).toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>m³</span>
                  </div>
                  <div className="metric-subtext">Structural pour</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Steel Rebar</div>
                  <div className="metric-value" style={{ fontSize: '1.25rem', color: 'var(--accent-emerald)' }}>
                    {Number(planResult.resource_allocation.estimated_structural_steel_tons).toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tons</span>
                  </div>
                  <div className="metric-subtext">Reinforcing steel</div>
                </div>
              </div>

              {/* Interactive Phased Gantt Visualization */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={15} color="var(--accent-amber)" /> Phased WBS Gantt Timeline
                </h4>

                <div className="gantt-wrapper">
                  {planResult.phases.map((ph) => {
                    const totalDays = planResult.total_duration_days;
                    const leftPct = (ph.start_day / totalDays) * 100;
                    const widthPct = Math.max(((ph.end_day - ph.start_day) / totalDays) * 100, 10);
                    const isExpanded = expandedPhaseId === ph.id;

                    return (
                      <div 
                        key={ph.id}
                        style={{
                          background: isExpanded ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.5)',
                          border: isExpanded ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setExpandedPhaseId(isExpanded ? null : ph.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                            {ph.id}: {ph.phase_name}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                            Day {ph.start_day} – {ph.end_day} ({ph.progress_percent}% done)
                          </span>
                        </div>

                        {/* Gantt Bar Track */}
                        <div className="gantt-bar-track">
                          <div 
                            className="gantt-bar-fill"
                            style={{ 
                              left: `${leftPct}%`, 
                              width: `${widthPct}%`,
                              background: ph.progress_percent === 100 ? 'linear-gradient(90deg, #10b981, #34d399)' : undefined
                            }}
                          >
                            ${(ph.estimated_cost_usd / 1000000).toFixed(1)}M
                          </div>
                        </div>

                        {/* Expanded Phase Details */}
                        {isExpanded && (
                          <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
                            <div style={{ marginBottom: '0.5rem' }}>
                              <strong style={{ color: '#fff' }}>Deliverables:</strong>
                              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                {ph.deliverables.map((del, i) => (
                                  <li key={i}>{del}</li>
                                ))}
                              </ul>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
                              <div><Users size={12} style={{ display: 'inline', marginRight: 4 }} /> Crews: {ph.crew_types.join(', ')}</div>
                              <div><Truck size={12} style={{ display: 'inline', marginRight: 4 }} /> Equipment: {ph.equipment.join(', ')}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Risk Matrix Table */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-orange)' }}>
                  <AlertTriangle size={15} /> Proactive Site Risk Matrix
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {planResult.risk_matrix.map((r, i) => (
                    <div 
                      key={i}
                      style={{
                        padding: '0.55rem 0.75rem',
                        background: 'rgba(30, 41, 59, 0.4)',
                        borderLeft: `3px solid ${r.impact === 'High' ? 'var(--accent-crimson)' : 'var(--accent-amber)'}`,
                        borderRadius: '0 6px 6px 0',
                        fontSize: '0.8rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <strong style={{ color: '#fff' }}>{r.risk_title}</strong>
                        <span style={{ fontSize: '0.7rem', color: r.impact === 'High' ? 'var(--accent-crimson)' : 'var(--accent-amber)', fontWeight: 700 }}>
                          Impact: {r.impact} | Prob: {r.probability}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <strong>Mitigation:</strong> {r.mitigation_strategy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <CalendarRange size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Planning Engine Ready</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Define project constraints or load an urban template on the left, then click <strong>"Synthesize Construction Plan"</strong> to generate the critical path schedule.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleRunPlanning}
                id="btn-run-planning-init"
              >
                <Sparkles size={16} />
                <span>Synthesize Plan</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
