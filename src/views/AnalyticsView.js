import React, { useState, useEffect } from 'react';
import { db } from '../services/db';

export default function AnalyticsView() {
  const [stats, setStats] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [niches, setNiches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([db.getAnalyticsStats(), db.getAnalyticsMonthly(), db.getAnalyticsNiches()]).then(
      ([s, m, n]) => {
        setStats(s);
        setMonthly(m);
        setNiches(n);
        setLoading(false);
      }
    );
  }, []);

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

  const gmvValues = monthly.map((m) => m.gmv);
  const maxGmv = Math.max(...gmvValues, 1);

  return (
    <div className="view">
      <div className="section-header">Intelligence</div>
      <div className="section-sub">Platform performance, deal flow, and growth metrics.</div>

      <div className="stats-grid">
        {stats.map((s) => (
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
          {monthly.map((m) => {
            const h = Math.round((m.gmv / maxGmv) * 120);
            return (
              <div className="bar-col" key={m.month}>
                <div className="bar-val">${Math.round(m.gmv / 1000)}k</div>
                <div className="bar" style={{ height: h }} />
                <div className="bar-label">{m.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-title">Deal Volume by Niche</div>
        {niches.map((n) => (
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
          ].map((t) => (
            <div key={t.label} style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--cinzel)',
                  fontSize: 13.5,
                  color: 'var(--text-muted)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--cinzel)',
                  fontSize: 42,
                  fontWeight: 700,
                  color: t.color,
                  marginBottom: 4,
                }}
              >
                {t.count}
              </div>
              <div
                style={{
                  height: 4,
                  background: 'var(--obsidian-5)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.round((t.count / 284) * 100)}%`,
                    height: '100%',
                    background: t.color,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
