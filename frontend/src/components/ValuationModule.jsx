import React, { useState } from 'react';
import { 
  TrendingUp, 
  Building, 
  DollarSign, 
  PieChart, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Scale, 
  RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { estimateValuation } from '../api';

export default function ValuationModule({ presets }) {
  const valuationPresets = presets?.valuation || [];

  const [propertyName, setPropertyName] = useState('Apex Commercial Tower');
  const [propertyType, setPropertyType] = useState('Commercial Office');
  const [areaSqft, setAreaSqft] = useState(45000);
  const [locationTier, setLocationTier] = useState('Tier 1 - Urban Metro Prime');
  const [structuralMaterial, setStructuralMaterial] = useState('Cast-in-Place Reinforced Concrete');
  const [constructionQuality, setConstructionQuality] = useState('Premium / Grade A');
  const [ageYears, setAgeYears] = useState(2);
  const [completionPercentage, setCompletionPercentage] = useState(100);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunValuation = async () => {
    setLoading(true);
    try {
      const res = await estimateValuation({
        property_name: propertyName,
        property_type: propertyType,
        built_up_area_sqft: Number(areaSqft),
        location_tier: locationTier,
        structural_material: structuralMaterial,
        construction_quality: constructionQuality,
        age_years: Number(ageYears),
        completion_percentage: Number(completionPercentage),
      });
      setResult(res);
      confetti({ particleCount: 45, spread: 60 });
    } catch (err) {
      console.error(err);
      alert('Error calculating valuation: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (p) => {
    setPropertyName(p.name);
    setPropertyType(p.property_type);
    setAreaSqft(p.built_up_area_sqft);
    setLocationTier(p.location_tier);
    setStructuralMaterial(p.structural_material);
    setConstructionQuality(p.construction_quality);
    setAgeYears(p.age_years);
    setCompletionPercentage(p.completion_percentage);
    setResult(null);
  };

  return (
    <div className="animate-fade-in" id="valuation-workspace">
      {/* Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <TrendingUp size={24} color="var(--accent-emerald)" />
            Real Estate & Construction Asset Valuation
          </h2>
          <p className="section-desc">
            Engineering-backed valuation model integrating structural material specifications, square footage, physical depreciation curves, and comparative market metrics.
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      {valuationPresets.length > 0 && (
        <div className="preset-bar">
          <span className="preset-label">
            <Building size={14} /> Quick Asset Presets:
          </span>
          {valuationPresets.map((p, idx) => (
            <button
              key={idx}
              className="preset-chip"
              onClick={() => handleSelectPreset(p)}
              id={`preset-val-${idx}`}
            >
              {p.name} ({p.built_up_area_sqft.toLocaleString()} sq.ft)
            </button>
          ))}
        </div>
      )}

      <div className="grid-two-col">
        {/* Left Column: Input Form Controls */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} /> Asset Characteristics & Parameters
          </h3>

          <div className="form-group">
            <label className="form-label">Asset / Project Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="e.g. Apex Commercial Tower" 
              id="input-val-name"
            />
          </div>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Asset Class / Type</label>
              <select 
                className="form-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                id="select-val-type"
              >
                <option value="Commercial Office">Commercial Office</option>
                <option value="Residential High-Rise">Residential High-Rise</option>
                <option value="Industrial Warehouse">Industrial Warehouse</option>
                <option value="Luxury Villa">Luxury Villa</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location Prime Tier</label>
              <select 
                className="form-select"
                value={locationTier}
                onChange={(e) => setLocationTier(e.target.value)}
                id="select-val-tier"
              >
                <option value="Tier 1 - Urban Metro Prime">Tier 1 - Urban Metro Prime</option>
                <option value="Tier 2 - Suburban Growth Hub">Tier 2 - Suburban Growth Hub</option>
                <option value="Tier 3 - Industrial Corridor">Tier 3 - Industrial Corridor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Built-Up Area (sq. ft)</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                {Number(areaSqft).toLocaleString()} sq.ft
              </span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="200000" 
              step="1000"
              value={areaSqft}
              onChange={(e) => setAreaSqft(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-emerald)' }} 
              id="slider-val-area"
            />
          </div>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Structural Material</label>
              <select 
                className="form-select"
                value={structuralMaterial}
                onChange={(e) => setStructuralMaterial(e.target.value)}
                id="select-val-material"
              >
                <option value="Cast-in-Place Reinforced Concrete">Cast-in-Place Reinforced Concrete</option>
                <option value="Steel Frame & Post-Tensioned Concrete">Steel Frame & Post-Tensioned Concrete</option>
                <option value="Precast Concrete & Insulated Panels">Precast Concrete & Insulated Panels</option>
                <option value="Engineered Mass Timber">Engineered Mass Timber</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Finishes Specification Grade</label>
              <select 
                className="form-select"
                value={constructionQuality}
                onChange={(e) => setConstructionQuality(e.target.value)}
                id="select-val-quality"
              >
                <option value="Premium / Grade A">Premium / Grade A</option>
                <option value="High-Efficiency Standard">High-Efficiency Standard</option>
                <option value="Luxury Residential Finishes">Luxury Residential Finishes</option>
                <option value="Basic Shell & Core">Basic Shell & Core</option>
              </select>
            </div>
          </div>

          <div className="grid-two-col" style={{ gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Operational Age (Years)</label>
              <input 
                type="number" 
                className="form-input" 
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                min="0"
                max="50"
                id="input-val-age"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Construction Completion (%)</label>
              <input 
                type="number" 
                className="form-input" 
                value={completionPercentage}
                onChange={(e) => setCompletionPercentage(e.target.value)}
                min="10"
                max="100"
                id="input-val-completion"
              />
            </div>
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={handleRunValuation}
            disabled={loading}
            id="btn-run-valuation"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Computing Valuation Models...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Generate Valuation Appraisal</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Appraisal Output Cards */}
        <div>
          {result ? (
            <div className="glass-panel" id="valuation-results-panel">
              {/* Main Headline Valuation */}
              <div style={{ textAlign: 'center', padding: '1.25rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Estimated Fair Market Value (USD)
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '0.25rem 0' }}>
                  ${result.estimated_value_usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Range: ${result.valuation_range_low.toLocaleString()} – ${result.valuation_range_high.toLocaleString()} | <strong>${result.price_per_sqft}/sq.ft</strong>
                </div>
              </div>

              {/* Metric Cards Row */}
              <div className="grid-three-col" style={{ margin: '1.25rem 0' }}>
                <div className="metric-card">
                  <div className="metric-label">Replacement Cost</div>
                  <div className="metric-value" style={{ fontSize: '1.15rem' }}>
                    ${(result.replacement_cost_usd / 1000000).toFixed(2)}M
                  </div>
                  <div className="metric-subtext">Gross build cost</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Depreciation</div>
                  <div className="metric-value" style={{ fontSize: '1.15rem', color: 'var(--accent-orange)' }}>
                    -${(result.depreciation_usd / 1000).toFixed(0)}k
                  </div>
                  <div className="metric-subtext">Physical & economic</div>
                </div>

                <div className="metric-card">
                  <div className="metric-label">Model Confidence</div>
                  <div className="metric-value" style={{ fontSize: '1.15rem', color: '#38bdf8' }}>
                    {result.market_confidence_score}%
                  </div>
                  <div className="metric-subtext">Statistical fit</div>
                </div>
              </div>

              {/* Cost Structure Breakdown */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <PieChart size={15} color="var(--accent-amber)" /> Engineering Cost Breakdown
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.entries(result.cost_breakdown).map(([component, cost], i) => {
                    const pct = Math.round((cost / result.estimated_value_usd) * 100);
                    return (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                          <span style={{ color: '#e2e8f0' }}>{component}</span>
                          <span style={{ color: 'var(--accent-amber)' }}>${cost.toLocaleString()} ({pct}%)</span>
                        </div>
                        <div className="progress-track" style={{ height: 6, margin: 0 }}>
                          <div 
                            className="progress-fill progress-fill-amber" 
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Value Drivers */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Scale size={15} color="var(--accent-cyan)" /> Key Valuation Drivers
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {result.key_drivers.map((drv, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        padding: '0.5rem 0.75rem', 
                        background: 'rgba(30, 41, 59, 0.4)', 
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#fff' }}>{drv.factor}:</strong>{' '}
                        <span style={{ color: 'var(--text-secondary)' }}>{drv.rationale}</span>
                      </div>
                      <span style={{ 
                        fontWeight: 700, 
                        color: drv.impact_percentage >= 0 ? 'var(--accent-emerald)' : 'var(--accent-crimson)',
                        whiteSpace: 'nowrap',
                        marginLeft: '0.75rem'
                      }}>
                        {drv.impact_percentage >= 0 ? `+${drv.impact_percentage}%` : `${drv.impact_percentage}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparable Benchmarks */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Comparable Market Transactions (Comps)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {result.comparable_benchmarks.map((comp, i) => (
                    <div 
                      key={i}
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(15, 23, 42, 0.5)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem'
                      }}
                    >
                      <span style={{ color: '#fff' }}>{comp.property}</span>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>${comp.sold_rate_sqft}/sq.ft</span>
                      <span style={{ color: 'var(--text-muted)' }}>Match: {comp.similarity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
              <TrendingUp size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Valuation Engine Standby</h3>
              <p style={{ maxWidth: 420, margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                Adjust asset parameters or choose a quick preset on the left, then click <strong>"Generate Valuation Appraisal"</strong> to calculate fair market and replacement value.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleRunValuation}
                id="btn-run-valuation-init"
              >
                <Sparkles size={16} />
                <span>Calculate Valuation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
