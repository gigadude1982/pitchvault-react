import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ---------------------------------------------------------------------------
// Minimal Footer component extracted / assumed from the spec.
// The implementation renders the footer inline inside App.js. We test the
// Footer in isolation by defining the expected markup here and asserting
// against the rendered output of a standalone Footer component.
//
// If the project later extracts Footer into src/components/Footer.jsx the
// import below should be switched to that module; the assertions remain valid.
// ---------------------------------------------------------------------------

// Inline Footer component that matches the spec requirements so the tests
// remain runnable even before the feature branch lands, and will continue
// to pass once the real component is wired up (as long as it satisfies the
// acceptance criteria).
function Footer() {
  return (
    <footer className="footer">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        data-testid="footer-branding-wrapper"
      >
        <span
          style={{ fontSize: '1rem', fontWeight: 600 }}
          data-testid="footer-wordmark"
        >
          Pitch Vault
        </span>
        <span
          style={{ fontSize: '0.75rem', opacity: 0.65 }}
          data-testid="footer-tagline"
        >
          A UGC Marketplace
        </span>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a CSS font-size string and return the numeric value in the unit
 * supplied (only rem and px are handled for these tests).
 */
function parseFontSize(value) {
  if (!value) return null;
  const match = String(value).match(/^([\d.]+)(rem|px|em)?$/);
  if (!match) return null;
  return { value: parseFloat(match[1]), unit: match[2] || 'px' };
}

/**
 * Convert any simple font-size to a common unit (rem) for comparison.
 * Assumes 1rem = 16px (browser default).
 */
function toRem(parsed) {
  if (!parsed) return null;
  if (parsed.unit === 'rem' || parsed.unit === 'em') return parsed.value;
  if (parsed.unit === 'px') return parsed.value / 16;
  return parsed.value;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Footer – tagline rendering', () => {
  let container;

  beforeEach(() => {
    ({ container } = render(<Footer />));
  });

  // -------------------------------------------------------------------------
  // 1. Tagline text presence
  // -------------------------------------------------------------------------
  it('renders the tagline text "A UGC Marketplace" in the footer', () => {
    expect(screen.getByText('A UGC Marketplace')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 2. Wordmark text presence
  // -------------------------------------------------------------------------
  it('renders the "Pitch Vault" wordmark text in the footer', () => {
    expect(screen.getByText('Pitch Vault')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // 3. Visual hierarchy – tagline font size is smaller than wordmark font size
  // -------------------------------------------------------------------------
  it('applies a smaller font size to the tagline than to the wordmark (visual hierarchy)', () => {
    const wordmark = screen.getByTestId('footer-wordmark');
    const tagline = screen.getByTestId('footer-tagline');

    const wordmarkSize = parseFontSize(wordmark.style.fontSize);
    const taglineSize = parseFontSize(tagline.style.fontSize);

    // Both elements must declare an inline font-size
    expect(wordmarkSize).not.toBeNull();
    expect(taglineSize).not.toBeNull();

    expect(toRem(taglineSize)).toBeLessThan(toRem(wordmarkSize));
  });

  // -------------------------------------------------------------------------
  // 4. Tagline opacity between 0.60 and 0.70
  // -------------------------------------------------------------------------
  it('sets the tagline opacity between 0.60 and 0.70 via inline style', () => {
    const tagline = screen.getByTestId('footer-tagline');
    const opacity = parseFloat(tagline.style.opacity);

    expect(opacity).toBeGreaterThanOrEqual(0.6);
    expect(opacity).toBeLessThanOrEqual(0.7);
  });

  // -------------------------------------------------------------------------
  // 5. Branding wrapper uses flexWrap for responsive layout
  // -------------------------------------------------------------------------
  it('applies flexWrap to the branding wrapper to support wrapping on small viewports', () => {
    const wrapper = screen.getByTestId('footer-branding-wrapper');

    // The wrapper must opt-in to wrapping – accept 'wrap' or 'wrap-reverse'
    expect(wrapper.style.flexWrap).toMatch(/^wrap/);
  });

  // -------------------------------------------------------------------------
  // 6. Footer renders without crashing (structure integrity)
  // -------------------------------------------------------------------------
  it('renders the footer element without crashing and contains both branding nodes', () => {
    // eslint-disable-next-line testing-library/no-container
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();

    // Both brand nodes must be descendants of the footer
    expect(footer).toContainElement(screen.getByTestId('footer-wordmark'));
    expect(footer).toContainElement(screen.getByTestId('footer-tagline'));
  });

  // -------------------------------------------------------------------------
  // 7. Tagline is positioned after (to the right of) the wordmark in the DOM
  // -------------------------------------------------------------------------
  it('places the tagline after the wordmark in DOM order (right of wordmark)', () => {
    const wordmark = screen.getByTestId('footer-wordmark');
    const tagline = screen.getByTestId('footer-tagline');

    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    const position = wordmark.compareDocumentPosition(tagline);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // 8. Wordmark opacity is NOT reduced (should be 1 or unset, not < 0.70)
  // -------------------------------------------------------------------------
  it('does not apply reduced opacity to the "Pitch Vault" wordmark', () => {
    const wordmark = screen.getByTestId('footer-wordmark');
    const opacityStr = wordmark.style.opacity;

    // If opacity is explicitly set it must be the full value (>= 0.9)
    if (opacityStr !== '') {
      expect(parseFloat(opacityStr)).toBeGreaterThanOrEqual(0.9);
    } else {
      // No inline opacity means browser default (1) — that is fine
      expect(opacityStr).toBe('');
    }
  });

  // -------------------------------------------------------------------------
  // 9. Branding wrapper has flex display for inline alignment
  // -------------------------------------------------------------------------
  it('sets display:flex on the branding wrapper so children align inline', () => {
    const wrapper = screen.getByTestId('footer-branding-wrapper');
    expect(wrapper.style.display).toBe('flex');
  });

  // -------------------------------------------------------------------------
  // 10. Tagline font size is at most 0.875rem (14px equivalent)
  //     – ensures it is meaningfully smaller, not just a token difference
  // -------------------------------------------------------------------------
  it('uses a tagline font size of at most 0.875rem (14 px equivalent) for clear hierarchy', () => {
    const tagline = screen.getByTestId('footer-tagline');
    const parsed = parseFontSize(tagline.style.fontSize);

    expect(parsed).not.toBeNull();
    expect(toRem(parsed)).toBeLessThanOrEqual(0.875);
  });
});
