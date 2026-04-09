import React, { useState } from 'react';
import { useToast } from '../ToastContext';

const FEATURES = [
  { label: 'Platform access & creator profile', monthly: true, annual: true },
  { label: 'Visibility in brand discovery feed', monthly: true, annual: true },
  { label: 'Unlimited campaign requests', monthly: true, annual: true },
  { label: 'In-platform messaging & file delivery', monthly: true, annual: true },
  { label: 'Earnings dashboard & analytics', monthly: true, annual: true },
  { label: 'Digital product listings (3 max)', monthly: true, annual: true },
  { label: 'Unlimited digital product listings', monthly: false, annual: true },
  { label: 'Priority placement in discovery feed', monthly: false, annual: true },
  { label: 'Featured creator badge', monthly: false, annual: true },
  { label: 'Early access to brand campaigns', monthly: false, annual: true },
  { label: 'Advanced performance analytics', monthly: false, annual: true },
];

export default function SubscriptionView() {
  const showToast = useToast();
  const [selected, setSelected] = useState(null);

  const subscribe = (plan) => {
    setSelected(plan);
    showToast(`${plan === 'annual' ? 'Annual' : 'Monthly'} plan activated`);
  };

  return (
    <div className="view">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="section-header">Creator Membership</div>
        <div className="section-sub" style={{ maxWidth: 480, margin: '10px auto 0' }}>
          Join Pitch Vault and get discovered by top brands. Everything you need to close deals and grow your income.
        </div>
      </div>

      <div className="gold-divider"><span className="divider-gem">◆</span></div>

      <div className="pricing-grid">

        {/* Monthly */}
        <div className={`pricing-card${selected === 'monthly' ? ' selected' : ''}`}>
          <div className="pricing-card-header">
            <div className="pricing-label">Monthly</div>
            <div className="pricing-price">
              <span className="pricing-amount">$10.99</span>
              <span className="pricing-period">/ month</span>
            </div>
            <div className="pricing-billed">Billed monthly · Cancel anytime</div>
          </div>

          <div className="pricing-features">
            {FEATURES.map(f => (
              <div className={`pricing-feature${!f.monthly ? ' unavailable' : ''}`} key={f.label}>
                <span className="feature-check">{f.monthly ? '◆' : '—'}</span>
                {f.label}
              </div>
            ))}
          </div>

          <button
            className={selected === 'monthly' ? 'btn-submit-gold' : 'btn-outline'}
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => subscribe('monthly')}
          >
            {selected === 'monthly' ? '◆ Current Plan' : 'Get Started'}
          </button>
        </div>

        {/* Annual */}
        <div className={`pricing-card featured${selected === 'annual' ? ' selected' : ''}`}>
          <div className="pricing-best-value">Best Value — Save 24%</div>
          <div className="pricing-card-header">
            <div className="pricing-label">Annual</div>
            <div className="pricing-price">
              <span className="pricing-amount">$99.99</span>
              <span className="pricing-period">/ year</span>
            </div>
            <div className="pricing-billed">$8.33 / month · Billed annually</div>
          </div>

          <div className="pricing-features">
            {FEATURES.map(f => (
              <div className="pricing-feature" key={f.label}>
                <span className="feature-check">◆</span>
                {f.label}
              </div>
            ))}
          </div>

          <button
            className="btn-submit-gold"
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => subscribe('annual')}
          >
            {selected === 'annual' ? '◆ Current Plan' : 'Get Annual Access'}
          </button>
        </div>

      </div>

      <div className="revenue-panel" style={{ marginTop: 40, textAlign: 'center' }}>
        <div className="chart-title" style={{ marginBottom: 16 }}>Platform Revenue Model</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
          {[
            { label: 'Creator Subscriptions', value: '$10.99 – $99.99' },
            { label: 'Deal Transaction Fee', value: '20% platform fee' },
            { label: 'Digital Product Fee', value: '10% per sale' },
            { label: 'Affiliate Commission', value: '20–40% to affiliates' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--cinzel)', fontSize: 19.5, fontWeight: 700, color: 'var(--gold-light)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13.5, fontFamily: 'var(--cinzel)', letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
