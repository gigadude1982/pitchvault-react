import React, { useState, useCallback } from 'react';
import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import './styles.css';
import { ToastContext } from './ToastContext';
import pkg from '../package.json';
const { version } = pkg;

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

export default function App() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const isCreator = location.pathname === '/creator';
  const isAuth = AUTH_PATHS.includes(location.pathname);

  const [toast, setToast] = useState({ visible: false, msg: '' });

  const showToast = useCallback((msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast({ visible: false, msg: '' }), 2800);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!isAuth && (
          <nav className="nav">
            <Link to="/feed" className="nav-logo">
              <img src="/logo.png" alt="PitchVault" className="header-logo" />
              Pitch Vault
            </Link>

            <div className="nav-tabs">
              {TABS.map((t) => (
                <Link
                  key={t.path}
                  to={t.path}
                  className="nav-tab"
                  activeProps={{ className: 'nav-tab active' }}
                >
                  {t.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="role-toggle">
                <button
                  className={`role-btn${!isCreator ? ' active' : ''}`}
                  onClick={() => navigate({ to: '/feed' })}
                >
                  Brand
                </button>
                <button
                  className={`role-btn${isCreator ? ' active' : ''}`}
                  onClick={() => navigate({ to: '/creator' })}
                >
                  Creator
                </button>
              </div>
              <button
                className="nav-tab"
                style={{ fontSize: 13.5, opacity: 0.6 }}
                onClick={() => navigate({ to: '/auth' })}
              >
                Sign Out
              </button>
            </div>
          </nav>
        )}

        <div>
          <Outlet />
        </div>

        <div className={`toast${toast.visible ? ' show' : ''}`}>{toast.msg}</div>

        <footer className="footer">
          <img src="/logo.png" alt="PitchVault" className="footer-logo" />
          <span className="footer-version">
            v{version} &nbsp;·&nbsp; © {new Date().getFullYear()} PitchVault
          </span>
        </footer>
      </div>
    </ToastContext.Provider>
  );
}
