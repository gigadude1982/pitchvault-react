import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function AuthView() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('brand');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    navigate({ to: role === 'creator' ? '/creator' : '/feed' });
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="PitchVault" className="header-logo" />
          Pitch Vault
        </div>

        <div className="auth-tagline">
          {mode === 'signin' ? 'Welcome back.' : 'Join the marketplace.'}
        </div>

        <div className="auth-role-row">
          <button
            className={`auth-role-btn${role === 'brand' ? ' active' : ''}`}
            onClick={() => setRole('brand')}
          >
            Brand
          </button>
          <button
            className={`auth-role-btn${role === 'creator' ? ' active' : ''}`}
            onClick={() => setRole('creator')}
          >
            Creator
          </button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="form-label">{role === 'brand' ? 'Brand Name' : 'Full Name'}</label>
              <input
                className="form-input"
                placeholder={role === 'brand' ? 'e.g. Apex Nutrition' : 'e.g. Jordan Reeves'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="auth-field">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit-gold" style={{ marginTop: 8 }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'signin' ? (
            <>
              Don&apos;t have an account?{' '}
              <button className="auth-switch-btn" onClick={() => setMode('signup')}>
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="auth-switch-btn" onClick={() => setMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
