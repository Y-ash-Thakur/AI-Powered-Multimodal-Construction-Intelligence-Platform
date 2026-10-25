import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  ActivitySquare, 
  TrendingUp, 
  CalendarRange, 
  ClipboardCheck, 
  CloudSun, 
  BookOpenCheck 
} from 'lucide-react';

export const MODULE_TABS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'safety', label: 'Site Safety & PPE', icon: ShieldAlert },
  { id: 'crack', label: 'Crack & Structural Health', icon: ActivitySquare },
  { id: 'valuation', label: 'Real Estate Valuation', icon: TrendingUp },
  { id: 'planning', label: 'Project Planning & WBS', icon: CalendarRange },
  { id: 'daily-log', label: 'Daily Site Assistant', icon: ClipboardCheck },
  { id: 'weather', label: 'Weather-Aware Advisory', icon: CloudSun },
  { id: 'knowledge', label: 'Building Code Assistant', icon: BookOpenCheck },
];

export default function Navigation({ activeTab, onSelectTab }) {
  return (
    <div className="nav-tabs-wrapper">
      <div className="nav-tabs-list" role="tablist">
        {MODULE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              id={`tab-btn-${tab.id}`}
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
