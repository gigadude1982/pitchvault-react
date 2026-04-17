import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useToast } from '../ToastContext';

const KPI = [
  { label: 'Active Campaigns', value: '3' },
  { label: 'Total Spend', value: '$2,750' },
  { label: 'Completed Deals', value: '18' },
  { label: 'Avg Engagement', value: '6.2%' },
];

const MOCK_CAMPAIGNS = [
  {
    id: 1,
    title: 'Summer Skincare Launch',
    budget: '$1,200',
    status: 'Active',
    applied: 8,
    selected: 2,
    deadline: 'Apr 25, 2026',
  },
  {
    id: 2,
    title: 'Fitness App Promo',
    budget: '$800',
    status: 'In Progress',
    applied: 5,
    selected: 3,
    deadline: 'Apr 18, 2026',
  },
  {
    id: 3,
    title: 'Faith Lifestyle Series',
    budget: '$500',
    status: 'Active',
    applied: 12,
    selected: 1,
    deadline: 'May 2, 2026',
  },
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
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [goal, setGoal] = useState('Awareness');
  const [deliverable, setDeliverable] = useState('TikTok Video');
  const [contentStyle, setContentStyle] = useState('Testimonial');
  const [budget, setBudget] = useState('Open');
  const [timeline, setTimeline] = useState('3–5 Days');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetError, setBudgetError] = useState(false);

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
  };

  return (
    <div className="view">
      <div className="section-header">Brands Dashboard</div>
      <div className="section-sub">Manage campaigns, track spend, and discover creators.</div>

      {/* Quick Action Bar */}
      <div className="quick-action-bar">
        <button className="btn-gold qab-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? '✕ Close' : '+ Create Campaign'}
        </button>
        <button className="btn-outline qab-btn" onClick={() => router.push('/feed')}>
          Browse Creators
        </button>
        <button className="btn-outline qab-btn" onClick={() => setShowForm(false)}>
          Active Campaigns
        </button>
        <button className="btn-outline qab-btn">Saved Creators</button>
      </div>

      {/* KPI Strip */}
      <div className="kpi-strip">
        {KPI.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
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

      {/* Create Campaign Form */}
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
              style={{ marginBottom: 8 }}
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
