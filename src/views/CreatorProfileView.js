import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useToast } from '../ToastContext';
import { db } from '../services/db';

function Stars({ rating }) {
  return (
    <div className="stars-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`star${i <= Math.round(rating) ? ' filled' : ''}`}>
          ★
        </span>
      ))}
      <span className="stars-score">{Number(rating).toFixed(1)}</span>
    </div>
  );
}

Stars.propTypes = { rating: PropTypes.number.isRequired };

export default function CreatorProfileView() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const showToast = useToast();

  const [creator, setCreator] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    db.getCreatorById(parseInt(id)).then((data) => {
      if (data) {
        setCreator(data);
        setReviews(data.reviews ?? []);
      }
      setLoading(false);
    });
  }, [id]);

  const submitReview = () => {
    if (!reviewText.trim()) return;
    const newReview = {
      brand: 'Your Brand',
      rating: reviewRating,
      text: reviewText.trim(),
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    db.addReview(parseInt(id), newReview);
    setReviewText('');
    setShowReviewForm(false);
    showToast('Review submitted');
  };

  if (loading || !creator)
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

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : Number(creator.rating).toFixed(1);

  return (
    <div className="view">
      <button
        className="btn-outline"
        style={{ marginBottom: 20 }}
        onClick={() => navigate({ to: '/feed' })}
      >
        ← Back to Vault
      </button>

      <div className="panel profile-hero">
        <div className="profile-video-thumb" style={{ background: creator.bg }}>
          <span style={{ fontSize: 96 }}>{creator.emoji}</span>
          <div className="play-btn" style={{ width: 52, height: 52, fontSize: 27 }}>
            ▶
          </div>
          <div className="profile-video-label">Intro Video · 28s</div>
        </div>

        <div className="profile-hero-info">
          <div className="creator-name" style={{ fontSize: 33, marginBottom: 6 }}>
            {creator.name}
          </div>
          <div className="creator-handle" style={{ marginBottom: 8 }}>
            {creator.handle}
          </div>
          <Stars rating={parseFloat(avgRating)} />
          <div
            style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10, marginTop: 10 }}
          >
            <span className="niche-tag primary">{creator.niche}</span>
            {(creator.tags || []).includes('Faith-Based') && (
              <span className="niche-tag faith">Faith</span>
            )}
            {(creator.tags || [])
              .filter((t) => t !== 'Faith-Based')
              .map((t) => (
                <span className="niche-tag" key={t}>
                  {t}
                </span>
              ))}
          </div>
          {creator.badges && creator.badges.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {creator.badges.includes('verified') && (
                <span className="creator-badge badge-verified">✓ Verified</span>
              )}
              {creator.badges.includes('topPerformer') && (
                <span className="creator-badge badge-top">◆ Top Performer</span>
              )}
              {creator.badges.includes('fastDelivery') && (
                <span className="creator-badge badge-fast">⚡ Fast Delivery</span>
              )}
            </div>
          )}
          <p
            style={{
              fontSize: 19.5,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {creator.bio}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn-gold"
              onClick={() => {
                navigate({ to: '/request' });
                showToast(`Deal initiated with ${creator.name}`);
              }}
            >
              Request
            </button>
            <button
              className="btn-outline"
              onClick={() => showToast(`${creator.name} saved to vault`)}
            >
              ♡ Save
            </button>
          </div>
        </div>
      </div>

      <div className="gold-divider">
        <span className="divider-gem">◆</span>
      </div>

      <div className="profile-stats-row">
        {[
          { label: 'Reach', value: creator.reach },
          { label: 'Engagement', value: creator.engagement },
          { label: 'Deals Completed', value: creator.completed },
          { label: 'Starting Rate', value: creator.rate },
        ].map((s) => (
          <div className="profile-stat" key={s.label}>
            <div className="profile-stat-value">{s.value}</div>
            <div className="profile-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section-header" style={{ marginTop: 32, marginBottom: 16 }}>
        Portfolio
      </div>
      <div className="portfolio-grid">
        {(creator.portfolio || []).map((emoji, i) => (
          <div className="portfolio-item" key={i} style={{ background: creator.bg }}>
            <span style={{ fontSize: 48 }}>{emoji}</span>
            <div className="play-btn" style={{ width: 32, height: 32, fontSize: 18 }}>
              ▶
            </div>
          </div>
        ))}
      </div>

      <div className="section-header" style={{ marginTop: 32, marginBottom: 16 }}>
        Past Brand Work
      </div>
      <div className="panel">
        {(creator.brands || []).map((brand, i) => (
          <div
            key={brand}
            className="brand-work-row"
            style={{
              borderBottom: i < creator.brands.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="brand-work-dot" />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--cinzel)',
                    fontSize: 16.5,
                    letterSpacing: 2,
                    color: 'var(--gold-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  {brand}
                </div>
                <div style={{ fontSize: 16.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  UGC Campaign · Completed
                </div>
              </div>
            </div>
            <span className="escrow-badge badge-released">Verified</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        <div>
          <div className="section-header" style={{ marginBottom: 4 }}>
            Reviews
          </div>
          <Stars rating={parseFloat(avgRating)} />
        </div>
        <button className="btn-outline" onClick={() => setShowReviewForm((v) => !v)}>
          {showReviewForm ? 'Cancel' : '+ Leave a Review'}
        </button>
      </div>

      {showReviewForm && (
        <div className="panel" style={{ marginBottom: 20 }}>
          <div className="form-section-label" style={{ marginBottom: 14 }}>
            Your Review
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setReviewRating(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 24,
                  color: i <= reviewRating ? 'var(--gold)' : 'var(--border)',
                  padding: 0,
                }}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="form-input"
            style={{ resize: 'vertical', minHeight: 80 }}
            placeholder="Share your experience working with this creator..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="btn-submit-gold" style={{ marginTop: 12 }} onClick={submitReview}>
            Submit Review
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reviews.map((r, i) => (
          <div className="review-card" key={r.id ?? i}>
            <div className="review-header">
              <div>
                <div className="review-brand">{r.brand}</div>
                <div className="review-date">{r.date}</div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="review-text">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
