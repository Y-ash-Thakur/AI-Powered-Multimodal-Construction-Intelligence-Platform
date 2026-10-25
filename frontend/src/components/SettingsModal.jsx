import React, { useState } from 'react';
import { X, Key, Check, ShieldCheck, Cpu, Database, RefreshCw } from 'lucide-react';
import { updateApiKey } from '../api';

export default function SettingsModal({ isOpen, onClose, systemStatus, onRefreshStatus }) {
  if (!isOpen) return null;

  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSaveKey = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateApiKey(apiKey);
      setSuccessMsg('API configuration saved successfully!');
      if (onRefreshStatus) onRefreshStatus();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert('Error updating API key: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="settings-modal-backdrop">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 'var(--radius-sm)', 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: 'var(--accent-amber)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Key size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>System Config & LLM Keys</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Multimodal AI Engine Settings & Diagnostics
              </p>
            </div>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={onClose}
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            id="btn-close-settings"
          >
            <X size={16} />
          </button>
        </div>

        {/* Current Active Mode Banner */}
        <div style={{ 
          padding: '0.85rem 1rem', 
          background: 'rgba(15, 23, 42, 0.7)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Inference Mode
            </span>
            <span className="system-status-pill" style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem' }}>
              <span className="pulse-dot"></span>
              {systemStatus?.active_mode || 'Local Multimodal Core'}
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-secondary)' }}>
            The platform includes an autonomous, high-fidelity multimodal simulation engine with strict JSON-based data contracts. Adding a Gemini API Key enables live multimodal reasoning over user uploads.
          </p>
        </div>

        {/* Form to enter Gemini Key */}
        <form onSubmit={handleSaveKey} style={{ marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Google Gemini API Key (Optional)</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="AIzaSy..." 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              id="input-gemini-key"
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              If left blank, the platform uses the pre-calibrated domain expert multimodal engine.
            </span>
          </div>

          {successMsg && (
            <div style={{ 
              padding: '0.5rem 0.75rem', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#34d399', 
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Check size={14} />
              <span>{successMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={saving}
              id="btn-save-key"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
              <span>Save Key</span>
            </button>
          </div>
        </form>

        {/* Diagnostic Module Checks */}
        <div>
          <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Module Status & Contract Verification
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: 150, overflowY: 'auto' }}>
            {(systemStatus?.modules_ready || []).map((mod, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '0.75rem', 
                  color: '#cbd5e1',
                  padding: '0.25rem 0'
                }}
              >
                <ShieldCheck size={13} color="var(--accent-emerald)" />
                <span>{mod}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--accent-emerald)', fontWeight: 600 }}>Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
