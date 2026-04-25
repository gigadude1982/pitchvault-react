import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from '@tanstack/react-router';
import { useToast } from '../ToastContext';
import { db } from '../services/db';

const KPI = [
  { label: 'Active Campaigns', value: '3' },
  { label: 'Total Spend', value: '$2,750' },
  { label: 'Completed Deals', value: '18' },
  { label: 'Avg Engagement', value: '6.2%' },
];

function OptionGroup({ options, cols = 3, selected, onSelect }) {
  return (
    <div className={cols === 2 ? 'option-grid-2' : 'option-grid'}>
      {options.map((o) => (
        <div
          key={o}
          className={`option-btn${selected === o ? ' sel' : ''}`}
          onClick={() => onSelect(o)}
        >
          {o}
        </div>
      ))}
    </div>
  );
}

OptionGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  cols: PropTypes.number,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default function CampaignView() {
  const showToast = useToast();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState('Awareness');
  const [deliverable, setDeliverable] = useState('TikTok Video');
  const [contentStyle, setContentStyle] = useState('Testimonial');
  const [budget, setBudget] = useState('Open');
  const [timeline, setTimeline] = useState('3–5 Days');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetError, setBudgetError] = useState(false);

  useEffect(() => {
    db.getCampaigns().then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = () => {
    if (budget === 'Fixed' && (parseFloat(budgetAmount) < 250 || !budgetAmount)) {
      setBudgetError(true);
      showToast('Minimum campaign budget is $250');
      return;
    }
    setBudgetError(false);
    showToast('Brief submitted — creator notified');
  };

  const pauseCampaign = (id) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Paused' } : c)));
    showToast('Campaign paused');
    db.pauseCampaign(id);
  };

  if (loading)
    return (
      <div
        className="view"
        style={{
          textAlign: 'center',
          padding: '60px 0',
          fontFamily: 'var(--cinzel)',
          color: 'var(--text-muted)',
          letterSpacing: 3,
        }}
      >
        LOADING...
      </div>
    );

  return (
    <div className="view">
      <div className="section-header">Brands Dashboard</div>
      <div className="section-sub">Manage campaigns, track spend, and discover creators.</div>

      <div className="quick-action-bar">
        <button className="btn-gold qab-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? '✕ Close' : '+ Create Campaign'}
        </button>
        <button className="btn-outline qab-btn" onClick={() => navigate({ to: '/feed' })}>
          Browse Creators
        </button>
        <button className="btn-outline qab-btn" onClick={() => setShowForm(false)}>
          Active Campaigns
        </button>
        <button className="btn-outline qab-btn">Saved Creators</button>
      </div>

      <div className="kpi-strip">
        {KPI.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {!showForm && (
        <div>
          <div className="section-label-row">Active Campaigns</div>
          <div className="campaign-cards">
            {campaigns.map((c) => (
              <div className="campaign-card" key={c.id}>
                <div className="campaign-card-header">
                  <span className="campaign-card-title">{c.title}</span>
                  <span
                    className={`campaign-status-badge status-${c.status.toLowerCase().replace(' ', '-')}`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="campaign-card-meta">
                  <span>
                    Budget: <strong>{c.budget}</strong>
                  </span>
                  <span>
                    Applied: <strong>{c.applied}</strong>
                  </span>
                  <span>
                    Selected: <strong>{c.selected}</strong>
                  </span>
                  <span>
                    Deadline: <strong>{c.deadline}</strong>
                  </span>
                </div>
                <div className="campaign-card-actions">
                  <button className="btn-gold" style={{ fontSize: 12, padding: '5px 14px' }}>
                    View Details
                  </button>
                  <button className="btn-outline" style={{ fontSize: 12, padding: '5px 14px' }}>
                    Edit
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ fontSize: 12, padding: '5px 14px' }}
                    onClick={() => pauseCampaign(c.id)}
                  >
                    Pause
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="panel">
          <div className="form-section">
            <div className="form-section-label">Campaign Intelligence</div>
            <div style={{ marginBottom: 10 }}>
              <label className="form-label">Campaign name</label>
              <input className="form-input" placeholder="e.g. Summer Launch Series" />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label className="form-label">Product / Service</label>
              <input className="form-input" placeholder="Describe your product" />
            </div>
            <div>
              <label className="form-label">Objective</label>
              <OptionGroup
                options={['Awareness', 'Sales', 'Content']}
                selected={goal}
                onSelect={setGoal}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-label">Deliverables</div>
            <OptionGroup
              options={['TikTok Video', 'UGC Ad', 'Product Photos', 'Reel']}
              cols={2}
              selected={deliverable}
              onSelect={setDeliverable}
            />
          </div>

          <div className="form-section">
            <div className="form-section-label">Content Style</div>
            <OptionGroup
              options={[
                'Testimonial',
                'Unboxing',
                'Tutorial',
                'Storytelling',
                'Skit / Comedy',
                'Before & After',
                'Cinematic',
                'Voiceover',
              ]}
              cols={2}
              selected={contentStyle}
              onSelect={setContentStyle}
            />
          </div>

          <div className="form-section">
            <div className="form-section-label">Investment</div>
            <OptionGroup
              options={['Fixed', 'Open', 'Get Quote']}
              selected={budget}
              onSelect={(v) => {
                setBudget(v);
                setBudgetError(false);
              }}
            />
            {budget === 'Fixed' && (
              <div style={{ marginTop: 8 }}>
                <input
                  className={`form-input${budgetError ? ' input-error' : ''}`}
                  placeholder="$ Amount (min. $250)"
                  value={budgetAmount}
                  onChange={(e) => {
                    setBudgetAmount(e.target.value);
                    setBudgetError(false);
                  }}
                />
                {budgetError && (
                  <div
                    style={{
                      fontSize: 13.5,
                      color: '#e06060',
                      fontFamily: 'var(--cinzel)',
                      letterSpacing: 1,
                      marginTop: 6,
                    }}
                  >
                    Minimum campaign budget is $250
                  </div>
                )}
              </div>
            )}
            {budget !== 'Fixed' && (
              <div style={{ marginTop: 8 }}>
                <input className="form-input" placeholder="$ Amount (optional)" />
              </div>
            )}
            <div
              style={{
                fontSize: 13.5,
                color: 'var(--text-muted)',
                fontFamily: 'var(--cinzel)',
                letterSpacing: 1,
                marginTop: 8,
              }}
            >
              Platform minimum: $250 per campaign
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-label">Timeline</div>
            <OptionGroup
              options={['ASAP', '3–5 Days', 'Custom']}
              selected={timeline}
              onSelect={setTimeline}
            />
          </div>

          <button className="btn-submit-gold" onClick={handleSubmit}>
            Submit Commission Brief
          </button>
        </div>
      )}
    </div>
  );
}
