import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  HardHat, 
  Eye, 
  Filter, 
  Sparkles, 
  RefreshCw,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analyzeSiteSafety } from '../api';

export default function SiteSafetyModule({ presets }) {
  const defaultPreset = presets?.safety;

  const [siteLocation, setSiteLocation] = useState(defaultPreset?.site_location || 'Bay 3, High-Rise Core East');
  const [inspectionFocus, setInspectionFocus] = useState(defaultPreset?.inspection_focus || 'PPE Compliance & Scaffolding Fall Hazard Check');
  const [notes, setNotes] = useState(defaultPreset?.notes || 'Routine morning audit prior to post-tension concrete pour.');
  const [imagePreviewSvg, setImagePreviewSvg] = useState(defaultPreset?.sample_svg || '');
  const [customImageBase64, setCustomImageBase64] = useState(null);

  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'ppe_missing', 'hazard'
  const [hoveredBoxId, setHoveredBoxId] = useState(null);
  const [checkedActions, setCheckedActions] = useState({});

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const res = await analyzeSiteSafety({
        image_base64: customImageBase64 || null,
        site_location: siteLocation,
        inspection_focus: inspectionFocus,
        additional_notes: notes,
      });
      setAnalysisResult(res);
      if (res.overall_status === 'COMPLIANT') {
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (err) {
      console.error(err);
      alert('Error analyzing site safety: ' + err.message);
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

  const handleLoadPreset = () => {
    if (defaultPreset) {
      setSiteLocation(defaultPreset.site_location);
      setInspectionFocus(defaultPreset.inspection_focus);
      setNotes(defaultPreset.notes);
      setImagePreviewSvg(defaultPreset.sample_svg);
      setCustomImageBase64(null);
      setAnalysisResult(null);
    }
  };

  const toggleActionChecked = (idx) => {
    setCheckedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const filteredDetections = (analysisResult?.detections || []).filter((d) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ppe_missing') return d.type === 'ppe_missing';
    if (activeFilter === 'hazard') return d.type === 'hazard';
    return true;
  });

  return (
    <div className="animate-fade-in" id="site-safety-workspace">
      {/* Module Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <ShieldAlert size={24} color="var(--accent-orange)" />
            Construction Site Safety & PPE Monitoring
          </h2>
          <p className="section-desc">
            Multimodal artificial intelligence analyzes site imagery in real time to verify hard hats, high-vis vests, scaffolding fall barriers, and flag OSHA regulatory violations.
          </p>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          onClick={handleLoadPreset}
          id="btn-load-safety-preset"
        >
          <RefreshCw size={14} />
          <span>Reset Sample Site Audit</span>
        </button>
      </div>

      <div className="grid-two-col">
        {/* Left Column: Image Viewer with Interactive Bounding Boxes */}
        <div>
          <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={16} color="var(--accent-amber)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                  Multimodal Visual Inspection Viewport
                </span>
              </div>
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                <Camera size={14} />
                <span>Upload Site Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload}
                  id="input-upload-site-image" 
                />
              </label>
            </div>

            {/* Visual Canvas Container */}
            <div className="image-viewer-container" id="safety-canvas-container">
              {customImageBase64 ? (
                <img 
                  src={customImageBase64} 
                  alt="Site custom upload" 
                  className="preview-image" 
                />
              ) : imagePreviewSvg ? (
                <div 
                  className="svg-display-wrap"
                  dangerouslySetInnerHTML={{ __html: imagePreviewSvg }} 
                />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <HardHat size={48} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                  <p>No site image loaded. Click Upload or Reset Sample.</p>
                </div>
              )}

              {/* Render Bounding Boxes */}
              {analysisResult && filteredDetections.map((box) => {
                const [ymin, xmin, ymax, xmax] = box.box_2d;
                const top = `${ymin}%`;
                const left = `${xmin}%`;
                const height = `${ymax - ymin}%`;
                const width = `${xmax - xmin}%`;
                const isHovered = hoveredBoxId === box.id;

                let boxClass = 'bbox-hazard';
                let tagClass = 'tag-hazard';
                if (box.type === 'ppe_present') {
                  boxClass = 'bbox-ppe-present';
                  tagClass = 'tag-ppe-present';
                } else if (box.type === 'ppe_missing') {
                  boxClass = 'bbox-ppe-missing';
                  tagClass = 'tag-ppe-missing';
                } else if (box.type === 'equipment') {
                  boxClass = 'bbox-equipment';
                  tagClass = 'tag-equipment';
                }

                return (
                  <div
                    key={box.id}
                    id={`bbox-${box.id}`}
                    className={`bbox-overlay ${boxClass}`}
                    style={{
                      top,
                      left,
                      height,
                      width,
                      boxShadow: isHovered ? '0 0 15px rgba(255, 255, 255, 0.8)' : undefined,
                      zIndex: isHovered ? 20 : 10
                    }}
                    onMouseEnter={() => setHoveredBoxId(box.id)}
                    onMouseLeave={() => setHoveredBoxId(null)}
                  >
                    <span className={`bbox-label-tag ${tagClass}`}>
                      {box.label} ({Math.round(box.confidence * 100)}%)
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bounding Box Type Legend */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '0.85rem', 
              fontSize: '0.75rem',
              flexWrap: 'wrap',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, background: 'var(--accent-emerald)', borderRadius: 2 }}></span>
                PPE Compliant
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, background: 'var(--accent-crimson)', borderRadius: 2 }}></span>
                PPE Missing / Violation
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, background: 'var(--accent-orange)', borderRadius: 2 }}></span>
                Fall / Trip Hazard
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, background: 'var(--accent-cyan)', borderRadius: 2 }}></span>
                Heavy Equipment
              </span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Inspection Parameters
            </h3>

            <div className="form-group">
              <label className="form-label">Site Zone / Location</label>
              <input 
                type="text" 
                className="form-input" 
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                placeholder="e.g. Tower 2 - Level 14 Deck" 
                id="input-site-location"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Inspection Focus Scope</label>
              <select 
                className="form-select"
                value={inspectionFocus}
                onChange={(e) => setInspectionFocus(e.target.value)}
                id="select-inspection-focus"
              >
                <option value="PPE Compliance & Scaffolding Fall Hazard Check">PPE Compliance & Scaffolding Fall Hazard Check</option>
                <option value="Trench & Deep Excavation Perimeter Safety">Trench & Deep Excavation Perimeter Safety</option>
                <option value="Overhead Crane Rigging & Swing Radius Safety">Overhead Crane Rigging & Swing Radius Safety</option>
                <option value="Electrical Grounding & Cable Trip Hazard Scan">Electrical Grounding & Cable Trip Hazard Scan</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Field Notes / Superintendent Comments</label>
              <textarea 
                className="form-textarea"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional contextual details..."
                id="textarea-safety-notes"
              />
            </div>

            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleRunAnalysis}
              disabled={loading}
              id="btn-run-safety-analysis"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing Multimodal AI Inference...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Execute Multimodal Safety Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Report & OSHA Compliance */}
        <div>
          {analysisResult ? (
            <div className="glass-panel" id="safety-analysis-results">
              {/* Header Status & Score */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className={`status-badge ${
                    analysisResult.overall_status === 'COMPLIANT' ? 'badge-compliant' :
                    analysisResult.overall_status === 'CAUTION_REQUIRED' ? 'badge-warning' : 'badge-critical'
                  }`}>
                    {analysisResult.overall_status.replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                    Audited at {analysisResult.audit_timestamp}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Safety Score</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    {analysisResult.safety_score} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-track">
                <div 
                  className={`progress-fill ${analysisResult.safety_score >= 80 ? 'progress-fill-emerald' : analysisResult.safety_score >= 60 ? 'progress-fill-amber' : 'progress-fill-red'}`} 
                  style={{ width: `${analysisResult.safety_score}%` }}
                />
              </div>

              {/* Summary */}
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', marginTop: '0.75rem' }}>
                {analysisResult.summary}
              </p>

              {/* Detection Filter Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button 
                  className={`preset-chip ${activeFilter === 'all' ? 'btn-primary' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All ({analysisResult.detections.length})
                </button>
                <button 
                  className={`preset-chip ${activeFilter === 'ppe_missing' ? 'btn-primary' : ''}`}
                  onClick={() => setActiveFilter('ppe_missing')}
                >
                  PPE Violations
                </button>
                <button 
                  className={`preset-chip ${activeFilter === 'hazard' ? 'btn-primary' : ''}`}
                  onClick={() => setActiveFilter('hazard')}
                >
                  Hazards
                </button>
              </div>

              {/* Detection List */}
              <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: '1.25rem', paddingRight: 4 }}>
                {filteredDetections.map((d) => (
                  <div 
                    key={d.id}
                    style={{
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      background: hoveredBoxId === d.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={() => setHoveredBoxId(d.id)}
                    onMouseLeave={() => setHoveredBoxId(null)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{d.label}</span>
                      <span className={`status-badge ${d.severity === 'critical' ? 'badge-critical' : d.severity === 'high' ? 'badge-warning' : 'badge-safe'}`} style={{ fontSize: '0.65rem' }}>
                        {d.severity}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', margin: 0 }}>{d.description}</p>
                  </div>
                ))}
              </div>

              {/* OSHA Regulatory Violations */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-crimson)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertOctagon size={15} /> Cited OSHA Safety Violations
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {analysisResult.osha_violations.map((v, i) => (
                    <div key={i} style={{ 
                      padding: '0.55rem 0.75rem', 
                      background: 'rgba(239, 68, 68, 0.08)', 
                      borderLeft: '3px solid var(--accent-crimson)',
                      fontSize: '0.8rem',
                      color: '#fecaca',
                      borderRadius: '0 6px 6px 0'
                    }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              {/* Immediate Corrective Actions Checklist */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={15} /> Mandatory Field Actions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {analysisResult.immediate_actions.map((act, i) => {
                    const isChecked = !!checkedActions[i];
                    return (
                      <div 
                        key={i}
                        onClick={() => toggleActionChecked(i)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.5rem 0.75rem',
                          background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          color: isChecked ? '#a7f3d0' : '#e2e8f0',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          onChange={() => {}} 
                          style={{ accentColor: 'var(--accent-emerald)' }} 
                        />
                        <span>{act}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <ShieldAlert size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Site Safety Audit Ready</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Click <strong>"Execute Multimodal Safety Scan"</strong> to analyze active personnel, detect PPE violations, and flag OSHA hazards on the viewport.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleRunAnalysis}
                id="btn-run-safety-init"
              >
                <Sparkles size={16} />
                <span>Run Inspection Now</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
