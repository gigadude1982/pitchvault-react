import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useToast } from '../ToastContext';
import { db } from '../services/db';

const NICHE_GROUPS = [
  { label: 'All', niches: [] },
  {
    label: 'E-Commerce',
    niches: ['Fashion', 'Streetwear', 'Skincare', 'Home Decor', 'Food Content'],
  },
  { label: 'Digital & SaaS', niches: ['Tech', 'SaaS', 'Gaming', 'Entrepreneurship'] },
  { label: 'Fitness & Wellness', niches: ['Fitness', 'Wellness'] },
  { label: 'Education', niches: ['Educational', 'Personal Branding', 'Real Estate'] },
  { label: 'Faith-Based', niches: ['Faith-Based'] },
];

const RATE_FILTERS = [
  { label: 'Any Rate', min: 0, max: Infinity },
  { label: 'Under $1K', min: 0, max: 999 },
  { label: '$1K – $2K', min: 1000, max: 2000 },
  { label: '$2K+', min: 2001, max: Infinity },
];

const PLATFORMS = ['All', 'TikTok', 'Instagram', 'YouTube'];

export default function DiscoverView() {
  const navigate = useNavigate();
  const showToast = useToast();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeRate, setActiveRate] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    db.getCreators().then((data) => {
      setCreators(data);
      setSaved(Object.fromEntries(data.map((c) => [c.id, c.saved])));
      setLoading(false);
    });
  }, []);

  const toggleSave = (e, id, name) => {
    e.stopPropagation();
    setSaved((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `${name} added to vault` : 'Removed from vault');
      return next;
    });
  };

  const group = NICHE_GROUPS[activeGroup];
  const rateFilter = RATE_FILTERS[activeRate];
  const filtered = creators.filter((c) => {
    const matchesGroup =
      group.niches.length === 0 ||
      group.niches.includes(c.niche) ||
      (c.tags || []).some((t) => group.niches.includes(t));
    const matchesRate = c.rate_num >= rateFilter.min && c.rate_num <= rateFilter.max;
    return matchesGroup && matchesRate;
  });

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
      <div className="feed-header">
        <div>
          <div className="section-header">Creator Vault</div>
          <div className="feed-count">
            {filtered.length} of {creators.length} creators shown
          </div>
        </div>
      </div>

      <div className="gold-divider">
        <span className="divider-gem">◆</span>
      </div>

      <div className="filter-row">
        {NICHE_GROUPS.map((g, i) => (
          <button
            key={g.label}
            className={`filter-chip${activeGroup === i ? ' on' : ''}`}
            onClick={() => setActiveGroup(i)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="filter-row" style={{ marginTop: 8 }}>
        {RATE_FILTERS.map((r, i) => (
          <button
            key={r.label}
            className={`filter-chip${activeRate === i ? ' on' : ''}`}
            onClick={() => setActiveRate(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="filter-row" style={{ marginTop: 8 }}>
        {PLATFORMS.map((p, i) => (
          <button
            key={p}
            className={`filter-chip${activePlatform === i ? ' on' : ''}`}
            onClick={() => setActivePlatform(i)}
          >
            {p}
          </button>
        ))}
      </div>

      {group.niches.length > 0 && (
        <div className="filter-row" style={{ marginTop: 8 }}>
          {group.niches.map((n) => {
            const count = creators.filter(
              (c) => c.niche === n || (c.tags || []).includes(n)
            ).length;
            return (
              <span key={n} className="niche-sub-tag">
                {n} <span className="niche-sub-count">{count}</span>
              </span>
            );
          })}
        </div>
      )}

      <div className="creator-grid">
        {filtered.map((c) => (
          <div className="creator-card" key={c.id}>
            <div className="creator-thumb" style={{ background: c.bg }}>
              <span style={{ fontSize: 66 }}>{c.emoji}</span>
              <div className="play-btn">▶</div>
              <button
                className={`save-btn${saved[c.id] ? ' saved' : ''}`}
                onClick={(e) => toggleSave(e, c.id, c.name)}
              >
                {saved[c.id] ? '♥' : '♡'}
              </button>
            </div>
            <div className="creator-info">
              <div className="creator-name">{c.name}</div>
              <div className="creator-handle">{c.handle}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <div>
                  <span className="niche-tag primary">{c.niche}</span>
                  {(c.tags || []).includes('Faith-Based') && (
                    <span className="niche-tag faith">Faith</span>
                  )}
                  {(c.tags || [])
                    .filter((t) => t !== 'Faith-Based')
                    .slice(0, 2)
                    .map((t) => (
                      <span className="niche-tag" key={t}>
                        {t}
                      </span>
                    ))}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--cinzel)',
                    fontSize: 12,
                    color: 'var(--gold)',
                    fontWeight: 700,
                  }}
                >
                  {c.rate}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ color: 'var(--gold)', fontSize: 12 }}>
                  {'★'.repeat(Math.round(c.rating))}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--cinzel)',
                  }}
                >
                  {Number(c.rating).toFixed(1)} · {c.completed} deals
                </span>
              </div>
              {c.badges && c.badges.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                  {c.badges.includes('verified') && (
                    <span className="creator-badge badge-verified">✓ Verified</span>
                  )}
                  {c.badges.includes('topPerformer') && (
                    <span className="creator-badge badge-top">◆ Top Performer</span>
                  )}
                  {c.badges.includes('fastDelivery') && (
                    <span className="creator-badge badge-fast">⚡ Fast Delivery</span>
                  )}
                </div>
              )}
              <div className="creator-actions">
                <button
                  className="btn-gold"
                  onClick={() => {
                    navigate({ to: '/request' });
                    showToast(`${c.name} invited to campaign`);
                  }}
                >
                  Invite to Campaign
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate({ to: '/creators/$id', params: { id: String(c.id) } })}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 0',
            color: 'var(--text-muted)',
            fontFamily: 'var(--cinzel)',
            letterSpacing: 2,
            fontSize: 16.5,
          }}
        >
          NO CREATORS MATCH YOUR FILTERS
        </div>
      )}
    </div>
  );
}
