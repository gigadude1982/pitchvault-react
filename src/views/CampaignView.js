import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../ToastContext';

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

  return (
    <div className="view">
      <div className="section-header">Commission Brief</div>
      <div className="section-sub">
        Submit your campaign brief — your creator responds within 24 hours.
      </div>

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
    </div>
  );
}
