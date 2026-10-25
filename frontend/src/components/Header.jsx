import React from 'react';
import { HardHat, Activity, Key, ShieldCheck, Cpu } from 'lucide-react';

export default function Header({ systemStatus, onOpenSettings }) {
  return (
    <header className="header-bar" id="app-header">
      <div className="brand-wrapper">
        <div className="brand-icon-box">
          <HardHat size={24} strokeWidth={2.5} />
        </div>
        <div>
          <div className="brand-title">
            BuildIQ
            <span className="brand-badge">Multimodal AI 1.0</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Construction Decision-Support & Multimodal Vision System
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className="system-status-pill" title="AI Backend Status">
          <span className="pulse-dot"></span>
          <span>{systemStatus?.active_mode || 'Backend Connected'}</span>
        </div>

        <button 
          className="btn btn-secondary btn-sm"
          onClick={onOpenSettings}
          title="Configure API Keys & Diagnostics"
          id="btn-open-settings"
        >
          <Key size={14} />
          <span>Config / LLM Key</span>
        </button>
      </div>
    </header>
  );
}
