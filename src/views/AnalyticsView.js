import React from 'react';

const STATS = [
  { label: 'Active Creators', value: '284', delta: '+12 this week' },
  { label: 'Live Campaigns', value: '47', delta: '+8 vs last week' },
  { label: 'GMV (MTD)', value: '$38k', delta: '+24% MoM' },
  { label: 'Platform Revenue', value: '$15k', delta: '40% take rate' },
  { label: 'Avg Deal Size', value: '$809', delta: '+$112 MoM' },
  { label: 'Subscription MRR', value: '$3.1k', delta: '284 × $10.99' },
];

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
const GMV = [12000, 16500, 21000, 28000, 33000, 38000];

const NICHES = [
  { label: 'Fitness', pct: 28 },
  { label: 'Fashion', pct: 23 },
  { label: 'Tech', pct: 18 },
  { label: 'Faith', pct: 15 },
  { label: 'Wellness', pct: 10 },
  { label: 'Other', pct: 6 },
];

export default function AnalyticsView() {
  const maxGmv = Math.max(...GMV);

  return (
    <div className="view">
      <div className="section-header">Intelligence</div>
      <div className="section-sub">Platform performance, deal flow, and growth metrics.</div>

      <div className="stats-grid">
        {STATS.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-delta">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="chart-panel">
        <div className="chart-title">Monthly Gross Merchandise Value</div>
        <div className="bar-chart">
          {MONTHS.map((m, i) => {
            const h = Math.round((GMV[i] / maxGmv) * 120);
            return (
              <div className="bar-col" key={m}>
                <div className="bar-val">${Math.round(GMV[i] / 1000)}k</div>
                <div className="bar" style={{ height: h }} />
                <div className="bar-label">{m}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-title">Deal Volume by Niche</div>
        {NICHES.map(n => (
          <div className="niche-row" key={n.label}>
            <div className="niche-name">{n.label}</div>
            <div className="niche-track">
              <div className="niche-fill" style={{ width: `${n.pct}%` }} />
            </div>
            <div className="niche-pct">{n.pct}%</div>
          </div>
        ))}
      </div>

      <div className="chart-panel">
        <div className="chart-title">Subscription Tier Breakdown</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Monthly ($10.99)', count: 198, color: 'var(--gold)' },
            { label: 'Annual ($99.99)', count: 86, color: '#70c090' },
          ].map(t => (
            <div key={t.label} style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--cinzel)', fontSize: 13.5, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{t.label}</div>
              <div style={{ fontFamily: 'var(--cinzel)', fontSize: 42, fontWeight: 700, color: t.color, marginBottom: 4 }}>{t.count}</div>
              <div style={{ height: 4, background: 'var(--obsidian-5)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((t.count / 284) * 100)}%`, height: '100%', background: t.color, opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
