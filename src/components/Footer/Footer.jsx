import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.brandingRow}>
      <span className={styles.wordmark}>Pitch Vault</span>
      <span className={styles.tagline} data-testid="footer-tagline">
        A UGC Marketplace
      </span>
    </div>
  );
}
