import React from 'react';
import { 
  ShieldAlert, 
  ActivitySquare, 
  TrendingUp, 
  CalendarRange, 
  ClipboardCheck, 
  CloudSun, 
  BookOpenCheck,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Building2,
  HardHat
} from 'lucide-react';

export default function DashboardOverview({ onNavigate }) {
  const quickModules = [
    {
      id: 'safety',
      title: 'Site Safety & PPE Monitoring',
      desc: 'Multimodal computer vision scanning for hard hats, safety vests, scaffolding fall hazards, and OSHA violations.',
      icon: ShieldAlert,
      tag: 'Computer Vision',
      color: 'var(--accent-orange)'
    },
    {
      id: 'crack',
      title: 'Crack Detection & Structural Health',
      desc: 'Sub-millimeter crack aperture estimation, shear trajectory mapping, and ACI 224R remediation protocols.',
      icon: ActivitySquare,
      tag: 'Structural AI',
      color: 'var(--accent-cyan)'
    },
    {
      id: 'valuation',
      title: 'Real Estate & Asset Valuation',
      desc: 'Algorithmic cost-approach and market appraisal incorporating structural material, age, location tier, and finish grade.',
      icon: TrendingUp,
      tag: 'Financial Decision Engine',
      color: 'var(--accent-emerald)'
    },
    {
      id: 'planning',
      title: 'Construction Planning & WBS',
      desc: 'Automated 5-phase work breakdown scheduler, Gantt timeline tracking, resource allocations, and risk matrix.',
      icon: CalendarRange,
      tag: 'Operations Intelligence',
      color: 'var(--accent-amber)'
    },
    {
      id: 'daily-log',
      title: 'Daily Site Assistant',
      desc: 'Automated shift logs, trade manpower calculations, delay tracking, and verifiable executive site narratives.',
      icon: ClipboardCheck,
      tag: 'Site Management',
      color: 'var(--accent-blue)'
    },
    {
      id: 'weather',
      title: 'Weather-Aware Operations Advisory',
      desc: 'Real-time engineering thresholds for tower crane wind limits (OSHA 1926.1431) and hot/cold concrete curing (ACI 305/306R).',
      icon: CloudSun,
      tag: 'Predictive Safety',
      color: 'var(--accent-purple)'
    },
    {
      id: 'knowledge',
      title: 'Building Code & Standards Assistant',
      desc: 'Interactive AI reasoning over OSHA 1926, ACI 318-19 concrete standards, IBC 2024, and NFPA life safety codes.',
      icon: BookOpenCheck,
      tag: 'Knowledge Core',
      color: '#ec4899'
    }
  ];

  return (
    <div className="animate-fade-in" id="dashboard-overview-view">
      {/* Hero Welcome Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          marginBottom: '2rem', 
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.85))',
          borderLeft: '4px solid var(--accent-amber)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="brand-badge"><Sparkles size={11} style={{ display: 'inline', marginRight: 4 }} /> Multimodal Decision Core</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Project: Metro Central Tower 4</span>
            </div>
            <h1 style={{ fontSize: '1.9rem', marginBottom: '0.5rem' }}>
              AI-Powered Multimodal Construction Intelligence Platform
            </h1>
            <p style={{ maxWidth: '820px', fontSize: '0.95rem' }}>
              Unifying computer vision, structural diagnostics, predictive planning, and engineering standards to empower construction superintendents, structural engineers, and project managers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('safety')}
              id="btn-hero-launch-safety"
            >
              <HardHat size={16} />
              <span>Launch Site Safety Scan</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('knowledge')}
              id="btn-hero-launch-codes"
            >
              <BookOpenCheck size={16} />
              <span>Consult Building Codes</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Summary Strip */}
      <div className="grid-four-col" style={{ marginBottom: '2rem' }}>
        <div className="metric-card">
          <div className="metric-label">Composite Safety Score</div>
          <div className="metric-value" style={{ color: 'var(--accent-amber)' }}>
            88 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100</span>
          </div>
          <div className="metric-subtext" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-amber)' }}>
            <AlertTriangle size={12} /> 1 Elevated fall hazard flagged
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Structural Diagnostics</div>
          <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>
            14 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Elements</span>
          </div>
          <div className="metric-subtext" style={{ color: '#38bdf8' }}>
            1 Critical shear crack identified
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Portfolio Under Valuation</div>
          <div className="metric-value" style={{ color: 'var(--accent-emerald)' }}>
            $48.5M
          </div>
          <div className="metric-subtext" style={{ color: '#34d399' }}>
            Average $312/sq.ft appraisal rate
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Site Weather Status</div>
          <div className="metric-value" style={{ color: 'var(--accent-orange)' }}>
            CAUTION
          </div>
          <div className="metric-subtext" style={{ color: 'var(--accent-orange)' }}>
            Winds gusting at 42 km/h (Crane restriction)
          </div>
        </div>
      </div>

      {/* 7 Modules Navigation Grid */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <Building2 size={22} color="var(--accent-amber)" />
            Intelligence Modules
          </h2>
          <p className="section-desc">
            Explore dedicated multimodal intelligence tools designed for every phase of construction planning, safety, and field operations.
          </p>
        </div>
      </div>

      <div className="grid-three-col">
        {quickModules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div 
              key={mod.id}
              className="glass-panel"
              style={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => onNavigate(mod.id)}
              id={`card-module-${mod.id}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = mod.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 'var(--radius-md)', 
                    background: `rgba(255, 255, 255, 0.05)`, 
                    border: `1px solid ${mod.color}`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: mod.color
                  }}>
                    <Icon size={22} />
                  </div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '0.2rem 0.55rem', 
                    borderRadius: 999, 
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    {mod.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem' }}>{mod.title}</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{mod.desc}</p>
              </div>

              <div style={{ 
                marginTop: '1.25rem', 
                paddingTop: '0.85rem', 
                borderTop: '1px solid var(--border-subtle)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: mod.color
              }}>
                <span>Launch Workspace</span>
                <ArrowRight size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
