'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ToastContext } from '../src/ToastContext';

const VERSION = '2.0.0';

const TABS = [
  { path: '/feed', label: 'Discover' },
  { path: '/products', label: 'Marketplace' },
  { path: '/request', label: 'Campaign' },
  { path: '/messages', label: 'Messages' },
  { path: '/payments', label: 'Payments' },
  { path: '/stats', label: 'Analytics' },
  { path: '/subscribe', label: 'Subscribe' },
];

const AUTH_PATHS = ['/auth'];

export function LayoutShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isCreator = pathname === '/creator';
  const isAuth = AUTH_PATHS.includes(pathname);

  const [toast, setToast] = useState({ visible: false, msg: '' });
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showToast = useCallback((msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast({ visible: false, msg: '' }), 2800);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!isAuth && (
          <nav className="nav">
            <Link href="/feed" className="nav-logo">
              <img src="/logo.png" alt="PitchVault" className="header-logo" />
              Pitch Vault
            </Link>

            <div className="nav-tabs">
              {TABS.map((t) => (
                <Link
                  key={t.path}
                  href={t.path}
                  className={`nav-tab${pathname === t.path ? ' active' : ''}`}
                >
                  {t.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="role-toggle nav-role-toggle">
                <button
                  className={`role-btn${!isCreator ? ' active' : ''}`}
                  onClick={() => router.push('/feed')}
                >
                  Brand
                </button>
                <button
                  className={`role-btn${isCreator ? ' active' : ''}`}
                  onClick={() => router.push('/creator')}
                >
                  Creator
                </button>
              </div>

              <button
                className="nav-icon-btn"
                title="Messages"
                onClick={() => router.push('/messages')}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>

              <button className="nav-icon-btn" title="Notifications">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>

              <button
                className="nav-hamburger"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {menuOpen ? '\u2715' : '\u2630'}
              </button>

              <div className="nav-profile-wrap">
                <button className="nav-profile-btn" onClick={() => setProfileOpen((o) => !o)}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="nav-dropdown">
                    <button className="nav-dropdown-item" onClick={() => setProfileOpen(false)}>
                      Settings
                    </button>
                    <button className="nav-dropdown-item" onClick={() => setProfileOpen(false)}>
                      Billing
                    </button>
                    <div className="nav-dropdown-divider" />
                    <button
                      className="nav-dropdown-item danger"
                      onClick={() => {
                        setProfileOpen(false);
                        router.push('/auth');
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}

        {!isAuth && menuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-role-section">
              <span className="nav-mobile-role-label">View As</span>
              <div className="nav-mobile-role-row">
                <button
                  className={`role-btn${!isCreator ? ' active' : ''}`}
                  onClick={() => {
                    router.push('/feed');
                    setMenuOpen(false);
                  }}
                >
                  Brand
                </button>
                <button
                  className={`role-btn${isCreator ? ' active' : ''}`}
                  onClick={() => {
                    router.push('/creator');
                    setMenuOpen(false);
                  }}
                >
                  Creator
                </button>
              </div>
            </div>
            {TABS.map((t) => (
              <Link
                key={t.path}
                href={t.path}
                className={`nav-mobile-tab${pathname === t.path ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t.label}
              </Link>
            ))}
          </div>
        )}

        <div>{children}</div>

        <div className={`toast${toast.visible ? ' show' : ''}`}>{toast.msg}</div>

        <footer className="footer">
          <img src="/logo.png" alt="PitchVault" className="footer-logo" />
          <span className="footer-version">
            v{VERSION} &nbsp;&middot;&nbsp; &copy; {new Date().getFullYear()} PitchVault
          </span>
        </footer>
      </div>
    </ToastContext.Provider>
  );
}
