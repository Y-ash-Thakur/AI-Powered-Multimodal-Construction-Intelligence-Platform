import React, { useState } from 'react';
import { 
  ActivitySquare, 
  RefreshCw, 
  Camera, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet, 
  Sliders, 
  Eye,
  Layers,
  Wrench
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analyzeCrack } from '../api';

export default function CrackAnalysisModule({ presets }) {
  const defaultPreset = presets?.crack;

  const [structureType, setStructureType] = useState(defaultPreset?.structure_type || 'Reinforced Concrete Foundation Shear Wall');
  const [structuralAge, setStructuralAge] = useState(defaultPreset?.structural_age_years || 8);
  const [loadCondition, setLoadCondition] = useState(defaultPreset?.load_condition || 'Full Hydrostatic Ground Pressure & Dead Load');
  const [locationTag, setLocationTag] = useState(defaultPreset?.location_tag || 'Sub-grade Basement Level -2');
  const [imagePreviewSvg, setImagePreviewSvg] = useState(defaultPreset?.sample_svg || '');
  const [customImageBase64, setCustomImageBase64] = useState(null);

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const res = await analyzeCrack({
        image_base64: customImageBase64 || null,
        structure_type: structureType,
        structural_age_years: Number(structuralAge),
        load_condition: loadCondition,
        location_tag: locationTag,
      });
      setAnalysisResult(res);
      if (res.severity === 'Minor') {
        confetti({ particleCount: 40, spread: 50 });
      }
    } catch (err) {
      console.error(err);
      alert('Error analyzing crack: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImageBase64(reader.result);
        setImagePreviewSvg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPreset = () => {
    if (defaultPreset) {
      setStructureType(defaultPreset.structure_type);
      setStructuralAge(defaultPreset.structural_age_years);
      setLoadCondition(defaultPreset.load_condition);
      setLocationTag(defaultPreset.location_tag);
      setImagePreviewSvg(defaultPreset.sample_svg);
      setCustomImageBase64(null);
      setAnalysisResult(null);
    }
  };

  return (
    <div className="animate-fade-in" id="crack-analysis-workspace">
      {/* Header */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <ActivitySquare size={24} color="var(--accent-cyan)" />
            Structural Crack Detection & Health Analysis
          </h2>
          <p className="section-desc">
            Computer vision analyzes concrete micro-fractures, calculates millimeter aperture widths, identifies efflorescence leaching, and provides ACI 224R structural remediation plans.
          </p>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          onClick={handleResetPreset}
          id="btn-load-crack-preset"
        >
          <RefreshCw size={14} />
          <span>Reset Sample Concrete Element</span>
        </button>
      </div>

      <div className="grid-two-col">
        {/* Left Column: Visual Viewport with Glowing Diagnostic Fracture Overlay */}
        <div>
          <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  Structural Surface Diagnostics Viewport
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {analysisResult && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowOverlay(!showOverlay)}
                  >
                    <Layers size={13} />
                    <span>{showOverlay ? 'Hide Overlay' : 'Show Overlay'}</span>
                  </button>
                )}
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                  <Camera size={14} />
                  <span>Upload Photo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                    id="input-upload-crack-photo" 
                  />
                </label>
              </div>
            </div>

            {/* Visual Canvas Container */}
            <div className="image-viewer-container" id="crack-canvas-container">
              {customImageBase64 ? (
                <img 
                  src={customImageBase64} 
                  alt="Custom structural crack" 
                  className="preview-image" 
                />
              ) : imagePreviewSvg ? (
                <div 
                  className="svg-display-wrap"
                  dangerouslySetInnerHTML={{ __html: imagePreviewSvg }} 
                />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <ActivitySquare size={48} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                  <p>No structural image loaded.</p>
                </div>
              )}

              {/* Glowing Fracture Overlay SVG */}
              {analysisResult && showOverlay && (
                <svg 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 20
                  }}
                >
                  <defs>
                    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Draw Diagnostic Polyline */}
                  <polyline
                    points={analysisResult.overlay_path.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    strokeDasharray="2,1"
                    filter="url(#cyanGlow)"
                  />

                  {/* Nodes along crack */}
                  {analysisResult.overlay_path.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r="1"
                      fill="#fff"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.85rem', 
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Target: {locationTag}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>
                {analysisResult ? `Fracture traced (${analysisResult.estimated_length_cm} cm span)` : 'Ready for scan'}
              </span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={16} /> Structural Context & Parameters
            </h3>

            <div className="form-group">
              <label className="form-label">Structural Element Classification</label>
              <select 
                className="form-select"
                value={structureType}
                onChange={(e) => setStructureType(e.target.value)}
                id="select-structure-type"
              >
                <option value="Reinforced Concrete Foundation Shear Wall">Reinforced Concrete Foundation Shear Wall</option>
                <option value="Post-Tensioned Suspended Floor Slab">Post-Tensioned Suspended Floor Slab</option>
                <option value="Prestressed Concrete Transfer Girder">Prestressed Concrete Transfer Girder</option>
                <option value="Load-Bearing Masonry Retaining Wall">Load-Bearing Masonry Retaining Wall</option>
              </select>
            </div>

            <div className="grid-two-col" style={{ gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Service Life Age (Years)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={structuralAge}
                  onChange={(e) => setStructuralAge(e.target.value)}
                  min="0"
                  max="100"
                  id="input-structural-age"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Element Location Tag</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={locationTag}
                  onChange={(e) => setLocationTag(e.target.value)}
                  placeholder="e.g. Column C-4" 
                  id="input-location-tag"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current Service Load State</label>
              <input 
                type="text" 
                className="form-input" 
                value={loadCondition}
                onChange={(e) => setLoadCondition(e.target.value)}
                placeholder="e.g. Full dead load + water pressure" 
                id="input-load-condition"
              />
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleRunAnalysis}
              disabled={loading}
              id="btn-run-crack-analysis"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing Structural AI Diagnostics...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Execute Crack & Integrity Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Structural Diagnostic Metrics & Remediation */}
        <div>
          {analysisResult ? (
            <div className="glass-panel" id="crack-analysis-results">
              {/* Top Banner Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className={`status-badge ${
                    analysisResult.severity.includes('Minor') ? 'badge-safe' :
                    analysisResult.severity.includes('Moderate') ? 'badge-warning' : 'badge-critical'
                  }`}>
                    {analysisResult.severity}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    Type: <strong style={{ color: '#fff' }}>{analysisResult.crack_type}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Structural Risk Index</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {analysisResult.structural_risk_index} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>
              </div>

              {/* Metric Strips */}
              <div className="grid-three-col" style={{ marginBottom: '1.25rem' }}>
                <div className="metric-card">
                  <div className="metric-label">Estimated Width</div>
                  <div className="metric-value" style={{ fontSize: '1.3rem', color: '#fff' }}>
                    {analysisResult.estimated_width_mm} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mm</span>
                  </div>
                  <div className="metric-subtext">Aperture span</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Est. Length</div>
                  <div className="metric-value" style={{ fontSize: '1.3rem', color: '#fff' }}>
                    {analysisResult.estimated_length_cm} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>cm</span>
                  </div>
                  <div className="metric-subtext">Continuous path</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Moisture Leaching</div>
                  <div className="metric-value" style={{ fontSize: '1.1rem', color: analysisResult.moisture_efflorescence_detected ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}>
                    {analysisResult.moisture_efflorescence_detected ? 'Detected' : 'Dry'}
                  </div>
                  <div className="metric-subtext">Efflorescence trace</div>
                </div>
              </div>

              {/* Urgency Badge */}
              <div style={{ 
                padding: '0.75rem 1rem', 
                background: 'rgba(239, 68, 68, 0.12)', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <AlertTriangle size={20} color="var(--accent-crimson)" />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fca5a5' }}>
                    Action Level: {analysisResult.urgency_level}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fecaca' }}>
                    Protocol: {analysisResult.monitoring_protocol}
                  </div>
                </div>
              </div>

              {/* Hypotheses of Failure Causes */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertTriangle size={15} /> Engineering Cause Hypotheses
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {analysisResult.potential_causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* ACI 224R Structural Remediation Recommendations */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Wrench size={15} /> ACI 224R Remediation Protocols
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {analysisResult.remediation_recommendations.map((rem, i) => (
                    <div 
                      key={i}
                      style={{
                        padding: '0.6rem 0.85rem',
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderLeft: '3px solid var(--accent-emerald)',
                        borderRadius: '0 6px 6px 0',
                        fontSize: '0.82rem',
                        color: '#d1fae5'
                      }}
                    >
                      {rem}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <ActivitySquare size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Awaiting Fracture Telemetry</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Run the structural AI diagnostic engine to calculate shear fracture width, map trajectory points, and receive ACI 224R repair specifications.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleRunAnalysis}
                id="btn-run-crack-init"
              >
                <Sparkles size={16} />
                <span>Run Crack Diagnostics</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
