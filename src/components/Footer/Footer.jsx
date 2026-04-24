import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ version }) {
  return (
    <footer className={`footer ${styles.footer}`}>
      <div className={styles.brand}>
        <img src="/logo.png" alt="PitchVault" className="footer-logo" />
        <span className={styles.wordmark}>Pitch Vault</span>
        <span className={styles.tagline} aria-label="A UGC Marketplace">
          A UGC Marketplace
        </span>
      </div>
      <span className="footer-version">
        v{version} &nbsp;·&nbsp; © {new Date().getFullYear()} PitchVault
      </span>
    </footer>
  );
}
