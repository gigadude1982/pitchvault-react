import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ version }) {
  return (
    <footer className="footer">
      <img src="/logo.png" alt="PitchVault" className="footer-logo" />
      <span className={styles.branding}>
        <span className={styles.wordmark}>Pitch Vault</span>
        <span className={styles.tagline}>A UGC Marketplace</span>
      </span>
      <span className="footer-version">
        v{version} &nbsp;·&nbsp; © {new Date().getFullYear()} PitchVault
      </span>
    </footer>
  );
}
