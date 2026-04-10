import React, { useState } from 'react';
import { useToast } from '../ToastContext';

const PRODUCTS = [
  {
    id: 0,
    title: 'Cinematic LUT Pack Vol. 1',
    creator: 'Jordan Reeves',
    handle: '@jordanreeves',
    category: 'Presets',
    tags: ['Video', 'Cinematic'],
    emoji: '🎬',
    bg: '#1a1208',
    price: 29,
    sales: 312,
    commission: 30,
  },
  {
    id: 1,
    title: 'Content Creator OS',
    creator: 'Maya Chen',
    handle: '@mayachen.creates',
    category: 'Templates',
    tags: ['Notion', 'Productivity'],
    emoji: '📋',
    bg: '#10101a',
    price: 49,
    sales: 841,
    commission: 25,
  },
  {
    id: 2,
    title: 'Faith-Led Brand Bible',
    creator: 'Caleb St. James',
    handle: '@calebstjames',
    category: 'E-Book',
    tags: ['Branding', 'Faith'],
    emoji: '📖',
    bg: '#0e1410',
    price: 19,
    sales: 204,
    commission: 40,
  },
  {
    id: 3,
    title: 'SaaS Launch Playbook',
    creator: 'Sofia Voss',
    handle: '@sofiavoss',
    category: 'Course',
    tags: ['Tech', 'Strategy'],
    emoji: '🚀',
    bg: '#161208',
    price: 97,
    sales: 128,
    commission: 35,
  },
  {
    id: 4,
    title: 'Wellness Brand Kit',
    creator: 'Priya Nair',
    handle: '@priyanair.co',
    category: 'Templates',
    tags: ['Canva', 'Wellness'],
    emoji: '🌿',
    bg: '#0c1210',
    price: 39,
    sales: 567,
    commission: 30,
  },
  {
    id: 5,
    title: 'Raw Reels Preset Bundle',
    creator: 'Marcus Obi',
    handle: '@marcobi',
    category: 'Presets',
    tags: ['Mobile', 'Raw'],
    emoji: '📱',
    bg: '#180e08',
    price: 24,
    sales: 430,
    commission: 30,
  },
  {
    id: 6,
    title: 'Peaceful Living Guide',
    creator: 'Leila Karimi',
    handle: '@leilakarimi',
    category: 'E-Book',
    tags: ['Lifestyle', 'Faith'],
    emoji: '🌙',
    bg: '#101018',
    price: 15,
    sales: 189,
    commission: 40,
  },
  {
    id: 7,
    title: 'Dev Portfolio Masterclass',
    creator: 'Dev Sharma',
    handle: '@devsharma.dev',
    category: 'Course',
    tags: ['Tech', 'Career'],
    emoji: '⚡',
    bg: '#141008',
    price: 79,
    sales: 93,
    commission: 35,
  },
];

const FILTERS = ['All', 'Templates', 'Presets', 'E-Book', 'Course'];

const LIST_CATEGORIES = ['Templates', 'Presets', 'E-Book', 'Course', 'Music', 'Tools'];

export default function ProductsView() {
  const showToast = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, false])));
  const [showListForm, setShowListForm] = useState(false);
  const [listCategory, setListCategory] = useState('Templates');
  const [listCommission, setListCommission] = useState('30');

  const toggleSave = (e, id, title) => {
    e.stopPropagation();
    setSaved((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `${title} saved` : 'Removed from saved');
      return next;
    });
  };

  const copyAffiliate = (product) => {
    const link = `pitchvault.co/ref/${product.id}?aff=${product.handle.replace('@', '')}`;
    navigator.clipboard.writeText(link).catch(() => {});
    showToast(`Affiliate link copied — ${product.commission}% commission`);
  };

  const submitListing = () => {
    showToast('Product submitted for review');
    setShowListForm(false);
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.creator.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = PRODUCTS.reduce((s, p) => s + p.price * p.sales * 0.1, 0);

  return (
    <div className="view">
      <div className="feed-header">
        <div>
          <div className="section-header">Digital Marketplace</div>
          <div className="feed-count">
            {PRODUCTS.length} products available — earn affiliate commissions on every sale
          </div>
        </div>
        <button className="btn-gold" onClick={() => setShowListForm((v) => !v)}>
          {showListForm ? 'Cancel' : '+ List a Product'}
        </button>
      </div>

      {showListForm && (
        <div className="panel" style={{ marginBottom: 24 }}>
          <div className="form-section-label" style={{ marginBottom: 16 }}>
            List Your Digital Product
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}
          >
            <div>
              <label className="form-label">Product Title</label>
              <input className="form-input" placeholder="e.g. Ultimate Preset Pack" />
            </div>
            <div>
              <label className="form-label">Price (USD)</label>
              <input className="form-input" placeholder="e.g. 29" type="number" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="form-label">Description</label>
            <input className="form-input" placeholder="What's included in your product?" />
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}
          >
            <div>
              <label className="form-label">Category</label>
              <div className="filter-row" style={{ marginTop: 6 }}>
                {LIST_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`filter-chip${listCategory === c ? ' on' : ''}`}
                    onClick={() => setListCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Affiliate Commission %</label>
              <div className="filter-row" style={{ marginTop: 6 }}>
                {['20', '25', '30', '35', '40'].map((v) => (
                  <button
                    key={v}
                    className={`filter-chip${listCommission === v ? ' on' : ''}`}
                    onClick={() => setListCommission(v)}
                  >
                    {v}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="btn-submit-gold" onClick={submitListing}>
            Submit for Review
          </button>
        </div>
      )}

      <div className="gold-divider">
        <span className="divider-gem">◆</span>
      </div>

      <div className="product-search">
        <input
          className="form-input"
          placeholder="Search products, creators, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip${activeFilter === f ? ' on' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="creator-grid">
        {filtered.map((p) => (
          <div className="creator-card" key={p.id}>
            <div className="creator-thumb" style={{ background: p.bg }}>
              <span style={{ fontSize: 66 }}>{p.emoji}</span>
              <div className="commission-badge">{p.commission}% aff</div>
              <button
                className={`save-btn${saved[p.id] ? ' saved' : ''}`}
                onClick={(e) => toggleSave(e, p.id, p.title)}
              >
                {saved[p.id] ? '♥' : '♡'}
              </button>
            </div>
            <div className="creator-info">
              <div className="creator-name" style={{ fontSize: 19.5 }}>
                {p.title}
              </div>
              <div className="creator-handle">{p.handle}</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span className="niche-tag primary">{p.category}</span>
                {p.tags.map((t) => (
                  <span className="niche-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="product-price-row">
                <span className="product-price">${p.price}</span>
                <span className="product-sales">{p.sales.toLocaleString()} sales</span>
              </div>
              <div className="creator-actions">
                <button className="btn-gold" onClick={() => copyAffiliate(p)}>
                  Affiliate Link
                </button>
                <button className="btn-outline">Buy</button>
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
          NO PRODUCTS FOUND
        </div>
      )}

      <div className="revenue-panel" style={{ marginTop: 32 }}>
        <div className="chart-title">
          Marketplace Revenue Architecture — 10% platform fee on every sale
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
          {[
            { label: 'Total Products', value: PRODUCTS.length },
            {
              label: 'Total Sales',
              value: PRODUCTS.reduce((s, p) => s + p.sales, 0).toLocaleString(),
            },
            { label: 'Platform Revenue', value: `$${Math.round(totalRevenue).toLocaleString()}` },
            {
              label: 'Avg Commission',
              value: `${Math.round(PRODUCTS.reduce((s, p) => s + p.commission, 0) / PRODUCTS.length)}%`,
            },
          ].map((stat) => (
            <div key={stat.label}>
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
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--cinzel)',
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--gold-light)',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
