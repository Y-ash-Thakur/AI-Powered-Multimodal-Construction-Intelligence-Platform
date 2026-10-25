import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Sparkles, 
  Copy, 
  Printer, 
  Check, 
  Users, 
  Clock, 
  AlertCircle, 
  Plus, 
  Trash2,
  RefreshCw,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateDailyLog } from '../api';

export default function DailyLogModule() {
  const [date, setDate] = useState('2026-10-25');
  const [projectName, setProjectName] = useState('Horizon Skyline Tower');
  const [shift, setShift] = useState('Day Shift (07:00 - 16:30)');
  const [weatherSummary, setWeatherSummary] = useState('Clear, 24°C, Wind 12 km/h');

  const [subcontractors, setSubcontractors] = useState([
    { trade: 'Structural Concrete & Rebar', worker_count: 32 },
    { trade: 'Electrical & Conduit Rough-in', worker_count: 14 },
    { trade: 'Mechanical & HVAC Ductwork', worker_count: 18 },
    { trade: 'Safety & Traffic Marshals', worker_count: 4 }
  ]);

  const [activitiesText, setActivitiesText] = useState(
    "Poured 180 m³ ready-mix concrete on Level 7 floor plate\nCompleted post-tensioning duct placement on Bay C\nPassed MEP sleeve inspection by local municipal inspector"
  );
  const [safetyIncidents, setSafetyIncidents] = useState('Zero recordable incidents. 1 near-miss resolved: loose toe-board secured on scaffolding.');
  const [delaysEncountered, setDelaysEncountered] = useState('35-minute delay on Concrete Pump Truck #2 due to traffic rerouting.');

  const [loading, setLoading] = useState(false);
  const [logResult, setLogResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAddTrade = () => {
    setSubcontractors([...subcontractors, { trade: 'New Trade Contractor', worker_count: 5 }]);
  };

  const handleRemoveTrade = (index) => {
    setSubcontractors(subcontractors.filter((_, i) => i !== index));
  };

  const handleTradeChange = (index, field, value) => {
    const updated = [...subcontractors];
    updated[index][field] = field === 'worker_count' ? Number(value) : value;
    setSubcontractors(updated);
  };

  const handleGenerateLog = async () => {
    setLoading(true);
    try {
      const activitiesList = activitiesText.split('\n').filter(a => a.trim().length > 0);
      const res = await generateDailyLog({
        date,
        project_name: projectName,
        shift,
        weather_summary: weatherSummary,
        subcontractors,
        activities_completed: activitiesList,
        safety_incidents: safetyIncidents,
        delays_encountered: delaysEncountered,
      });
      setLogResult(res);
      confetti({ particleCount: 40, spread: 50 });
    } catch (err) {
      console.error(err);
      alert('Error generating daily log: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!logResult) return;
    navigator.clipboard.writeText(logResult.executive_narrative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" id="daily-log-workspace">
      {/* Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <ClipboardCheck size={24} color="var(--accent-blue)" />
            Daily Site Assistant & Executive Log Generator
          </h2>
          <p className="section-desc">
            Streamlines daily superintendent reporting, aggregates trade workforce man-hours, audits safety incidents, and exports verified construction logs.
          </p>
        </div>
      </div>

      <div className="grid-two-col">
        {/* Left Column: Daily Inputs */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={16} /> Site Log Inputs
          </h3>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Log Date</label>
              <input 
                type="date" 
                className="form-input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="input-log-date"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Shift Duration</label>
              <select 
                className="form-select"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                id="select-log-shift"
              >
                <option value="Day Shift (07:00 - 16:30)">Day Shift (07:00 - 16:30)</option>
                <option value="Night Shift (19:00 - 04:30)">Night Shift (19:00 - 04:30)</option>
                <option value="Continuous Weekend Pour Shift">Continuous Weekend Pour Shift</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              id="input-log-project"
            />
          </div>

          {/* Subcontractor Manpower Table */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Trade Workforce Manpower</label>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                onClick={handleAddTrade}
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              >
                <Plus size={12} /> Add Trade
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {subcontractors.map((sub, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={sub.trade} 
                    onChange={(e) => handleTradeChange(i, 'trade', e.target.value)}
                    style={{ flex: 1, padding: '0.45rem 0.75rem' }} 
                  />
                  <input 
                    type="number" 
                    className="form-input" 
                    value={sub.worker_count} 
                    onChange={(e) => handleTradeChange(i, 'worker_count', e.target.value)}
                    min="1"
                    style={{ width: '80px', padding: '0.45rem 0.75rem' }} 
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleRemoveTrade(i)}
                    style={{ padding: '0.45rem 0.6rem', color: 'var(--accent-crimson)' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Key Milestones & Work Completed (One per line)</label>
            <textarea 
              className="form-textarea"
              rows={3}
              value={activitiesText}
              onChange={(e) => setActivitiesText(e.target.value)}
              id="textarea-log-activities"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Safety Events / Near-Misses</label>
            <input 
              type="text" 
              className="form-input" 
              value={safetyIncidents}
              onChange={(e) => setSafetyIncidents(e.target.value)}
              id="input-log-safety"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Delays & Impediments</label>
            <input 
              type="text" 
              className="form-input" 
              value={delaysEncountered}
              onChange={(e) => setDelaysEncountered(e.target.value)}
              id="input-log-delays"
            />
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={handleGenerateLog}
            disabled={loading}
            id="btn-generate-log"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Compiling Daily Construction Log...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Compile Executive Daily Log</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Generated Report */}
        <div>
          {logResult ? (
            <div className="glass-panel" id="daily-log-results-panel">
              {/* Report Header & Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="status-badge badge-compliant">
                    {logResult.log_reference_id}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    Status: <strong style={{ color: '#fff' }}>{logResult.supervisor_signoff_badge}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={handleCopyMarkdown}
                    title="Copy Markdown"
                    id="btn-copy-log"
                  >
                    {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={handlePrint}
                    title="Print Document"
                    id="btn-print-log"
                  >
                    <Printer size={14} />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Man-Hour & Productivity Metrics */}
              <div className="grid-three-col" style={{ marginBottom: '1.25rem' }}>
                <div className="metric-card">
                  <div className="metric-label">Site Workers</div>
                  <div className="metric-value" style={{ fontSize: '1.3rem' }}>
                    {logResult.total_workers_on_site} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>active</span>
                  </div>
                  <div className="metric-subtext">Cumulative trades</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Man-Hours</div>
                  <div className="metric-value" style={{ fontSize: '1.3rem', color: 'var(--accent-amber)' }}>
                    {logResult.total_man_hours} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>hrs</span>
                  </div>
                  <div className="metric-subtext">8.5 hr shift base</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Productivity</div>
                  <div className="metric-value" style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)' }}>
                    Optimal
                  </div>
                  <div className="metric-subtext">94.2% milestone pace</div>
                </div>
              </div>

              {/* Material Deliveries Logged */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
                  Material Deliveries Logged
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {logResult.material_deliveries_summary.map((mat, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        padding: '0.45rem 0.65rem', 
                        background: 'rgba(30, 41, 59, 0.4)', 
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        color: '#e2e8f0'
                      }}
                    >
                      {mat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tomorrow's Priorities Checklist */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-amber)' }}>
                  Tomorrow's Priority Work Orders
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {logResult.tomorrow_priorities.map((pri, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-amber)' }}></span>
                      <span>{pri}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatted Markdown Box */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Verifiable Daily Site Log Narrative
                </h4>
                <pre style={{ 
                  background: 'rgba(11, 15, 25, 0.95)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1rem', 
                  fontSize: '0.75rem', 
                  color: '#cbd5e1', 
                  maxHeight: 200, 
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {logResult.executive_narrative}
                </pre>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <ClipboardCheck size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Daily Site Assistant Standby</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Enter shift activities and trade headcounts on the left, then click <strong>"Compile Executive Daily Log"</strong> to generate the formatted site report.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleGenerateLog}
                id="btn-generate-log-init"
              >
                <Sparkles size={16} />
                <span>Compile Site Log</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
