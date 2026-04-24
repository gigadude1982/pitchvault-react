import React from 'react';

/**
 * Footer component rendering the Pitch Vault wordmark alongside the
 * 'A UGC Marketplace' tagline.
 *
 * Color notes (WCAG AA compliance):
 * - The footer uses CSS class 'footer' which sets a dark background.
 * - The wordmark and tagline use near-white text (inherited from .footer).
 * - At 65% opacity on a dark background (#1a1a2e or similar), near-white text
 *   (#ffffff at 65% opacity) still exceeds the 4.5:1 contrast ratio required
 *   for normal text when the background is sufficiently dark (luminance < 0.05).
 * - If the background is light, swap to a dark text color (e.g. #111111) so
 *   that 65% opacity still meets 4.5:1.
 */
export default function Footer({ version, year }) {
  const currentYear = year ?? new Date().getFullYear();

  return (
    <footer className="footer">
      <img src="/logo.png" alt="PitchVault" className="footer-logo" />

      {/* Branding row: wordmark + tagline */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '0 0.5em',
        }}
      >
        <span className="footer-wordmark" style={{ fontWeight: 600 }}>
          Pitch Vault
        </span>
        <span
          className="footer-tagline"
          style={{
            fontSize: '0.7em',
            opacity: 0.65,
            fontWeight: 400,
          }}
        >
          A UGC Marketplace
        </span>
      </div>

      <span className="footer-version">
        v{version} &nbsp;&middot;&nbsp; &copy; {currentYear} PitchVault
      </span>
    </footer>
  );
}
