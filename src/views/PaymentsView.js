import React, { useState } from 'react';
import { useToast } from '../ToastContext';

const INITIAL_PAYMENTS = [
  { id: 0, creator: 'Jordan Reeves', campaign: 'Summer Launch', amount: 3500, status: 'held', statusLabel: 'Held in Escrow' },
  { id: 1, creator: 'Maya Chen', campaign: 'Fall Collection', amount: 1200, status: 'pending', statusLabel: 'Awaiting Delivery' },
  { id: 2, creator: 'Caleb St. James', campaign: 'Faith Lifestyle', amount: 850, status: 'held', statusLabel: 'Held in Escrow' },
  { id: 3, creator: 'Sofia Voss', campaign: 'TechDrop Launch', amount: 2200, status: 'released', statusLabel: 'Released' },
];

function badgeClass(status) {
  if (status === 'held') return 'badge-held';
  if (status === 'released') return 'badge-released';
  return 'badge-pending';
}

export default function PaymentsView() {
  const showToast = useToast();
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  const approve = (id) => {
    setPayments(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'released', statusLabel: 'Released' } : p
    ));
    const p = payments.find(p => p.id === id);
    showToast(`Funds released to ${p.creator}`);
  };

  const total = payments.reduce((s, p) => s + p.amount, 0);
  const released = payments.filter(p => p.status === 'released').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="view">
      <div className="section-header">Treasury</div>
      <div className="section-sub">Funds are secured in escrow until deliverables are approved.</div>

      <div className="payment-grid">
        {payments.map(p => {
          const creator = Math.round(p.amount * 0.8);
          const platform = Math.round(p.amount * 0.2);
          const isReleased = p.status === 'released';
          const isPending = p.status === 'pending';

          return (
            <div className="payment-card" key={p.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div className="payment-card-title">{p.creator}</div>
                  <div className="payment-card-sub">{p.campaign}</div>
                </div>
                <div className={`escrow-badge ${badgeClass(p.status)}`}>{p.statusLabel}</div>
              </div>

              <div className="payment-amount">${p.amount.toLocaleString()}</div>

              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ flex: 80 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontFamily: 'var(--cinzel)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                    Creator ${creator.toLocaleString()}
                  </div>
                  <div className="split-track">
                    <div className="split-fill-creator" style={{ width: '100%' }} />
                  </div>
                </div>
                <div style={{ flex: 20 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--text-muted)', fontFamily: 'var(--cinzel)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                    Platform ${platform.toLocaleString()}
                  </div>
                  <div className="split-track">
                    <div className="split-fill-platform" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {isPending ? (
                <button className="btn-approve waiting">Awaiting Delivery</button>
              ) : isReleased ? (
                <button className="btn-approve approved">◆ Funds Released</button>
              ) : (
                <button className="btn-approve approve" onClick={() => approve(p.id)}>
                  Approve & Release Funds
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="revenue-panel">
        <div className="chart-title">Revenue Architecture — 80% creator / 20% platform fee</div>
        <div style={{ height: 10, background: 'var(--obsidian-5)', border: '1px solid var(--border)', display: 'flex', overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ width: '80%', background: 'linear-gradient(90deg, #3B6D11, #5a9e20)' }} />
          <div style={{ width: '20%', background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))' }} />
        </div>
        <div className="split-legend">
          <span><span className="legend-dot" style={{ background: '#5a9e20' }} />Creator 80%</span>
          <span><span className="legend-dot" style={{ background: 'var(--gold)' }} />Platform 20%</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 13.5, fontFamily: 'var(--cinzel)', letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Total GMV</div>
            <div style={{ fontFamily: 'var(--cinzel)', fontSize: 30, fontWeight: 700, color: 'var(--gold-light)' }}>${total.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontFamily: 'var(--cinzel)', letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Released</div>
            <div style={{ fontFamily: 'var(--cinzel)', fontSize: 30, fontWeight: 700, color: '#70c090' }}>${released.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontFamily: 'var(--cinzel)', letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>In Escrow</div>
            <div style={{ fontFamily: 'var(--cinzel)', fontSize: 30, fontWeight: 700, color: 'var(--gold)' }}>${(total - released).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
