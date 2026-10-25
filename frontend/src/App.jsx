import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardOverview from './components/DashboardOverview';
import SiteSafetyModule from './components/SiteSafetyModule';
import CrackAnalysisModule from './components/CrackAnalysisModule';
import ValuationModule from './components/ValuationModule';
import ProjectPlanningModule from './components/ProjectPlanningModule';
import DailyLogModule from './components/DailyLogModule';
import WeatherAdvisoryModule from './components/WeatherAdvisoryModule';
import KnowledgeAssistantModule from './components/KnowledgeAssistantModule';
import SettingsModal from './components/SettingsModal';
import { fetchPresets, fetchSystemStatus } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [presets, setPresets] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const loadInitialData = async () => {
    try {
      const [presetsData, statusData] = await Promise.all([
        fetchPresets().catch(() => null),
        fetchSystemStatus().catch(() => null)
      ]);
      if (presetsData) setPresets(presetsData);
      if (statusData) setSystemStatus(statusData);
    } catch (err) {
      console.warn('Initial data load warning:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header 
        systemStatus={systemStatus} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Main Navigation Bar */}
      <Navigation 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
      />

      {/* Main Active Workspace View */}
      <main className="main-content" id="main-workspace-content">
        {activeTab === 'dashboard' && (
          <DashboardOverview onNavigate={setActiveTab} />
        )}
        {activeTab === 'safety' && (
          <SiteSafetyModule presets={presets} />
        )}
        {activeTab === 'crack' && (
          <CrackAnalysisModule presets={presets} />
        )}
        {activeTab === 'valuation' && (
          <ValuationModule presets={presets} />
        )}
        {activeTab === 'planning' && (
          <ProjectPlanningModule presets={presets} />
        )}
        {activeTab === 'daily-log' && (
          <DailyLogModule />
        )}
        {activeTab === 'weather' && (
          <WeatherAdvisoryModule presets={presets} />
        )}
        {activeTab === 'knowledge' && (
          <KnowledgeAssistantModule presets={presets} />
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '1.5rem 2rem', 
        borderTop: '1px solid var(--border-subtle)', 
        background: 'rgba(11, 15, 25, 0.95)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <strong style={{ color: '#fff' }}>BuildIQ Intelligence Core v1.0</strong> — Full-Stack Multimodal AI Decision Support
        </div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <span>React.js Frontend</span>
          <span>FastAPI Python Engine</span>
          <span>Strict JSON Schema Contracts</span>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        systemStatus={systemStatus}
        onRefreshStatus={loadInitialData}
      />
    </div>
  );
}
