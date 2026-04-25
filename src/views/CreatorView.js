import React, { useState, useEffect } from 'react';
import { useToast } from '../ToastContext';
import { db } from '../services/db';

export default function CreatorView() {
  const showToast = useToast();
  const [profile, setProfile] = useState(null);
  const [deals, setDeals] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([db.getCreatorProfile(), db.getDeals(), db.getCreatorEarnings()]).then(
      ([p, d, e]) => {
        setProfile(p);
        setDeals(d);
        setEarnings(e);
        setLoading(false);
      }
    );
  }, []);

  const accept = (id) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, status: 'active' } : d)));
    const deal = deals.find((d) => d.id === id);
    showToast(`Deal accepted with ${deal.brand}`);
    db.acceptDeal(id);
  };

  const decline = (id) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, status: 'declined' } : d)));
    const deal = deals.find((d) => d.id === id);
    showToast(`Deal declined — ${deal.brand} will be notified`);
    db.declineDeal(id);
  };

  if (loading || !profile)
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

  const maxEarning = Math.max(...earnings.map((e) => e.amount), 1);
  const totalEarned = earnings.reduce((s, e) => s + e.amount, 0);
  const inEscrow = deals.filter((d) => d.status === 'active').reduce((s, d) => s + d.budget, 0);

  return (
    <div className="view">
      {/* Profile */}
      <div
        className="panel"
        style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 24 }}
      >
        <div
          className="creator-thumb"
          style={{ width: 80, height: 80, minWidth: 80, background: '#1a1208', borderRadius: 4 }}
        >
          <span style={{ fontSize: 54 }}>{profile.emoji}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="creator-name" style={{ fontSize: 27, marginBottom: 4 }}>
            {profile.name}
          </div>
          <div className="creator-handle" style={{ marginBottom: 10 }}>
            {profile.handle}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="niche-tag primary">{profile.niche}</span>
            {(profile.tags || []).map((t) => (
              <span className="niche-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, textAlign: 'center' }}>
          {[
            { label: 'Reach', value: profile.reach },
            { label: 'Engagement', value: profile.engagement },
            { label: 'Deals Done', value: profile.completed },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: 'var(--cinzel)',
                  fontSize: 27,
                  fontWeight: 700,
                  color: 'var(--gold-light)',
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  fontFamily: 'var(--cinzel)',
                  letterSpacing: 2,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-divider">
        <span className="divider-gem">◆</span>
      </div>

      {/* Gamification */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 24, flexWrap: 'wrap' }}>
        <div
          className="panel"
          style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <div
            style={{
              fontSize: 13.5,
              fontFamily: 'var(--cinzel)',
              letterSpacing: 2,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Deal Streak
          </div>
          <div
            style={{
              fontFamily: 'var(--cinzel)',
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--gold-light)',
              lineHeight: 1,
            }}
          >
            {profile.streak}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
            consecutive deals completed on time
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: i < profile.streak ? 'var(--gold)' : 'var(--border)',
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontFamily: 'var(--cinzel)',
              letterSpacing: 1,
              marginTop: 2,
            }}
          >
            {10 - profile.streak} more for Gold streak
          </div>
        </div>

        <div
          className="panel"
          style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <div
            style={{
              fontSize: 13.5,
              fontFamily: 'var(--cinzel)',
              letterSpacing: 2,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Milestone
          </div>
          <div
            style={{
              fontFamily: 'var(--cinzel)',
              fontSize: 22.5,
              fontWeight: 700,
              color: 'var(--gold-light)',
              lineHeight: 1.2,
            }}
          >
            {profile.milestone} / {profile.milestone_target}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)', marginBottom: 6 }}>
            deals to Top Creator status
          </div>
          <div
            style={{
              height: 6,
              background: 'var(--obsidian-5)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(profile.milestone / profile.milestone_target) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))',
              }}
            />
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--gold)',
              fontFamily: 'var(--cinzel)',
              letterSpacing: 1,
              marginTop: 2,
            }}
          >
            {Math.round((profile.milestone / profile.milestone_target) * 100)}% complete
          </div>
        </div>

        <div
          className="panel"
          style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          <div
            style={{
              fontSize: 13.5,
              fontFamily: 'var(--cinzel)',
              letterSpacing: 2,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Leaderboard
          </div>
          <div
            style={{
              fontFamily: 'var(--cinzel)',
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--gold-light)',
              lineHeight: 1,
            }}
          >
            #{profile.leaderboard_rank}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
            out of 284 active creators
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#70c090',
              fontFamily: 'var(--cinzel)',
              letterSpacing: 1,
              marginTop: 4,
            }}
          >
            ▲ 3 spots this month
          </div>
        </div>
      </div>

      <div className="gold-divider">
        <span className="divider-gem">◆</span>
      </div>

      {/* Active Deals */}
      <div className="section-header" style={{ marginTop: 24, marginBottom: 6 }}>
        Active Campaigns
      </div>
      <div className="section-sub" style={{ marginBottom: 20 }}>
        Incoming briefs from brands — review and accept to lock in escrow.
      </div>

      <div className="payment-grid">
        {deals.map((d) => (
          <div className="payment-card" key={d.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div className="payment-card-title">{d.brand}</div>
                <div className="payment-card-sub">{d.campaign}</div>
              </div>
              <div
                className={`escrow-badge ${d.status === 'active' ? 'badge-held' : 'badge-pending'}`}
              >
                {d.status === 'active'
                  ? 'In Progress'
                  : d.status === 'declined'
                    ? 'Declined'
                    : 'Awaiting Acceptance'}
              </div>
            </div>

            <div
              style={{
                fontSize: 15,
                fontFamily: 'var(--cinzel)',
                letterSpacing: 1,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              {d.deliverable} &nbsp;·&nbsp; Due {d.deadline}
            </div>

            <div className="payment-amount" style={{ marginBottom: 14 }}>
              ${d.budget.toLocaleString()}
            </div>

            {d.status === 'pending' && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-approve approve"
                  style={{ flex: 1 }}
                  onClick={() => accept(d.id)}
                >
                  Accept
                </button>
                <button className="btn-approve decline" onClick={() => decline(d.id)}>
                  Decline
                </button>
              </div>
            )}
            {d.status === 'active' && (
              <button className="btn-approve approved">◆ Deal Accepted</button>
            )}
            {d.status === 'declined' && (
              <button className="btn-approve declined" disabled>
                ✕ Declined
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Earnings */}
      <div className="revenue-panel" style={{ marginTop: 24 }}>
        <div className="chart-title">Earnings Overview</div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
          <div>
            <div
              style={{
                fontSize: 13.5,
                fontFamily: 'var(--cinzel)',
                letterSpacing: 2,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              Total Earned
            </div>
            <div
              style={{
                fontFamily: 'var(--cinzel)',
                fontSize: 30,
                fontWeight: 700,
                color: 'var(--gold-light)',
              }}
            >
              ${totalEarned.toLocaleString()}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 13.5,
                fontFamily: 'var(--cinzel)',
                letterSpacing: 2,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              In Escrow
            </div>
            <div
              style={{
                fontFamily: 'var(--cinzel)',
                fontSize: 30,
                fontWeight: 700,
                color: 'var(--gold)',
              }}
            >
              ${inEscrow.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 80 }}>
          {earnings.map((e) => (
            <div
              key={e.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${(e.amount / maxEarning) * 64}px`,
                  background: 'linear-gradient(180deg, var(--gold-light), var(--gold-dim))',
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  fontSize: 13.5,
                  fontFamily: 'var(--cinzel)',
                  color: 'var(--text-muted)',
                  letterSpacing: 1,
                }}
              >
                {e.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
