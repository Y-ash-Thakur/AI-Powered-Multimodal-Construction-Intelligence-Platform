import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  RefreshCw, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { queryKnowledgeAssistant } from '../api';

export default function KnowledgeAssistantModule({ presets }) {
  const quickPrompts = presets?.knowledge_prompts || [
    "What is the maximum permissible wind speed for operating a hammerhead tower crane under OSHA 1926.1431?",
    "According to ACI 318-19, what is the minimum concrete cover thickness for cast-in-place rebar exposed to earth?",
    "What are the mandatory fall arrest requirements for workers on scaffolding above 10 feet under OSHA 1926.451?",
    "How does ambient temperature above 35°C affect Portland cement hydration, and what retarders are required by ACI 305R?"
  ];

  const [inputQuery, setInputQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('General Building Codes & Standards');
  const [loading, setLoading] = useState(false);

  // Initial chat history with an engineering onboarding message
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      domain: 'System',
      structured_answer: `### BuildIQ Technical Building Code Assistant Active
I am calibrated on **OSHA 29 CFR 1926 (Construction Safety)**, **ACI 318-19 (Structural Concrete)**, **IBC 2024 (International Building Code)**, and **NFPA Life Safety Standards**.

Ask any technical question or select one of the suggested engineering queries below to verify field compliance.`,
      cited_standards: ['OSHA 1926', 'ACI 318-19', 'IBC 2024'],
      inspection_checklist: ['Select a standard clause to inspect', 'Cross-reference IFC construction drawings'],
      safety_precautions: ['Always verify local municipal amendments prior to field implementation'],
      recommended_follow_ups: []
    }
  ]);

  const handleSend = async (queryText) => {
    const textToQuery = queryText || inputQuery;
    if (!textToQuery.trim()) return;

    // Add user message to history
    const userMsg = { sender: 'user', text: textToQuery };
    setChatHistory(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await queryKnowledgeAssistant({
        query: textToQuery,
        domain: selectedDomain
      });

      const aiMsg = {
        sender: 'ai',
        domain: res.domain,
        structured_answer: res.structured_answer,
        cited_standards: res.cited_standards,
        inspection_checklist: res.inspection_checklist,
        safety_precautions: res.safety_precautions,
        recommended_follow_ups: res.recommended_follow_ups
      };

      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          domain: 'Error',
          structured_answer: `**Error:** Failed to query technical assistant: ${err.message}`,
          cited_standards: [],
          inspection_checklist: [],
          safety_precautions: [],
          recommended_follow_ups: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" id="knowledge-assistant-workspace">
      {/* Title */}
      <div className="section-header-block">
        <div>
          <h2 className="section-title">
            <BookOpenCheck size={24} color="#ec4899" />
            Construction Knowledge & Building Code Assistant
          </h2>
          <p className="section-desc">
            Autonomous technical consultation engine cross-referencing federal OSHA safety regulations, ACI concrete standards, IBC 2024 egress codes, and engineering specifications.
          </p>
        </div>

        {/* Domain Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Domain Focus:</span>
          <select 
            className="form-select"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            id="select-knowledge-domain"
          >
            <option value="General Building Codes & Standards">General Building Codes & Standards</option>
            <option value="OSHA Safety Regulations (29 CFR 1926)">OSHA Safety Regulations (29 CFR 1926)</option>
            <option value="ACI Structural Concrete (ACI 318 / 305R)">ACI Structural Concrete (ACI 318 / 305R)</option>
            <option value="IBC 2024 International Building Code">IBC 2024 International Building Code</option>
            <option value="MEP & Fire Protection (NFPA / NEC)">MEP & Fire Protection (NFPA / NEC)</option>
          </select>
        </div>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="preset-bar">
        <span className="preset-label">
          <HelpCircle size={14} /> Quick Questions:
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            className="preset-chip"
            onClick={() => handleSend(q)}
            id={`btn-quick-prompt-${idx}`}
          >
            {q.length > 55 ? q.substring(0, 55) + '...' : q}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-messages" id="chat-messages-container">
          {chatHistory.map((msg, index) => {
            if (msg.sender === 'user') {
              return (
                <div key={index} className="chat-bubble chat-bubble-user">
                  {msg.text}
                </div>
              );
            }

            return (
              <div key={index} className="chat-bubble chat-bubble-ai">
                {/* Domain Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="brand-badge" style={{ fontSize: '0.65rem' }}>
                    {msg.domain || 'BuildIQ Technical Core'}
                  </span>
                </div>

                {/* Formatted Markdown Content */}
                <div style={{ whiteSpace: 'pre-wrap', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                  {msg.structured_answer}
                </div>

                {/* Cited Standards Pills */}
                {msg.cited_standards && msg.cited_standards.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Cited Regulatory Standards:
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {msg.cited_standards.map((std, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.72rem', 
                          background: 'rgba(245, 158, 11, 0.12)', 
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '0.15rem 0.5rem', 
                          borderRadius: '4px',
                          color: '#fef08a'
                        }}>
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inspection Checklist */}
                {msg.inspection_checklist && msg.inspection_checklist.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Field Verification Checklist:
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {msg.inspection_checklist.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safety Precautions */}
                {msg.safety_precautions && msg.safety_precautions.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-crimson)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Critical Precautions:
                    </div>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.78rem', color: '#fca5a5' }}>
                      {msg.safety_precautions.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommended Follow-ups */}
                {msg.recommended_follow_ups && msg.recommended_follow_ups.length > 0 && (
                  <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      Related:
                    </span>
                    {msg.recommended_follow_ups.map((fol, i) => (
                      <button
                        key={i}
                        className="preset-chip"
                        onClick={() => handleSend(fol)}
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                      >
                        {fol}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="chat-bubble chat-bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={16} className="animate-spin" color="var(--accent-amber)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Synthesizing engineering standards and clauses...
              </span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form 
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
        >
          <input 
            type="text" 
            className="form-input" 
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about OSHA scaffolding rules, concrete cover requirements, crane wind thresholds..." 
            disabled={loading}
            id="input-knowledge-chat"
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !inputQuery.trim()}
            id="btn-send-knowledge-chat"
          >
            <Send size={15} />
            <span>Consult</span>
          </button>
        </form>
      </div>
    </div>
  );
}
