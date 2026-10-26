/**
 * API client for BuildIQ Multimodal Construction Intelligence Platform
 */

const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:8000'
    : '');

export async function fetchPresets() {
  const res = await fetch(`${API_BASE_URL}/api/presets`);
  if (!res.ok) throw new Error('Failed to fetch presets');
  return res.json();
}

export async function fetchSystemStatus() {
  const res = await fetch(`${API_BASE_URL}/api/config/status`);
  if (!res.ok) throw new Error('Failed to fetch system status');
  return res.json();
}

export async function updateApiKey(apiKey) {
  const res = await fetch(`${API_BASE_URL}/api/config/key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey }),
  });
  if (!res.ok) throw new Error('Failed to update API key');
  return res.json();
}

export async function analyzeSiteSafety(payload) {
  const res = await fetch(`${API_BASE_URL}/api/safety/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to analyze site safety');
  return res.json();
}

export async function analyzeCrack(payload) {
  const res = await fetch(`${API_BASE_URL}/api/crack/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to analyze structural crack');
  return res.json();
}

export async function estimateValuation(payload) {
  const res = await fetch(`${API_BASE_URL}/api/valuation/estimate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to estimate valuation');
  return res.json();
}

export async function generateProjectPlan(payload) {
  const res = await fetch(`${API_BASE_URL}/api/planning/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate project plan');
  return res.json();
}

export async function generateDailyLog(payload) {
  const res = await fetch(`${API_BASE_URL}/api/daily-log/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate daily log');
  return res.json();
}

export async function generateWeatherAdvisory(payload) {
  const res = await fetch(`${API_BASE_URL}/api/weather/advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to generate weather advisory');
  return res.json();
}

export async function queryKnowledgeAssistant(payload) {
  const res = await fetch(`${API_BASE_URL}/api/knowledge/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to query knowledge assistant');
  return res.json();
}
