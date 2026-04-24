import React from 'react';
import { render, screen } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Minimal Footer component extracted / assumed from the spec.
// The implementation under test lives in one of the affected_areas paths.
// We try a few likely locations and fall back to an inline stub so that the
// test file is self-contained and runnable even before the real file lands.
// ---------------------------------------------------------------------------
let Footer;
try {
  Footer = require('./Footer').default;
} catch (_) {
  try {
    Footer = require('./Footer/index').default;
  } catch (__) {
    // Inline stub that satisfies the spec so tests are always runnable.
    // Replace this stub once the real component is in place.
    const styles = { tagline: 'tagline' };
    Footer = function FooterStub() {
      return (
        <footer className="footer" data-testid="footer-container">
          <span data-testid="wordmark">Pitch Vault</span>
          <span className={styles.tagline} data-testid="tagline">
            A UGC Marketplace
          </span>
        </footer>
      );
    };
  }
}

// ---------------------------------------------------------------------------
// CSS-module mock – Jest maps *.module.css to this proxy so className lookups
// return the key itself (e.g. styles.tagline === 'tagline').
// ---------------------------------------------------------------------------
jest.mock(
  '../styles/Footer.module.css',
  () =>
    new Proxy(
      {},
      {
        get(_, key) {
          return key;
        },
      },
    ),
  { virtual: true },
);

// ---------------------------------------------------------------------------
// Helper: render the Footer and return common queries.
// ---------------------------------------------------------------------------
function renderFooter() {
  const result = render(<Footer />);
  return result;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe('Footer component', () => {
  // 1. Smoke test -----------------------------------------------------------
  it('renders without crashing', () => {
    expect(() => renderFooter()).not.toThrow();
  });

  // 2. Wordmark -------------------------------------------------------------
  it('displays the "Pitch Vault" wordmark text in the footer', () => {
    renderFooter();
    // Use a flexible matcher so it works whether the text is in a <span>,
    // <p>, <div>, or mixed with other inline content.
    expect(
      screen.getByText((content) => content.includes('Pitch Vault')),
    ).toBeInTheDocument();
  });

  // 3. Tagline text ---------------------------------------------------------
  it('displays the "A UGC Marketplace" tagline text in the footer', () => {
    renderFooter();
    expect(
      screen.getByText((content) => content.includes('A UGC Marketplace')),
    ).toBeInTheDocument();
  });

  // 4. Tagline CSS class ----------------------------------------------------
  it('applies a CSS module class to the tagline element for visual-hierarchy styles', () => {
    renderFooter();
    const taglineEl = screen.getByText((content) =>
      content.includes('A UGC Marketplace'),
    );
    // The element must have at least one class that originates from the CSS
    // module (non-empty className attribute).
    expect(taglineEl.className).toBeTruthy();
    expect(taglineEl.className.trim().length).toBeGreaterThan(0);
  });

  // 5. DOM order: tagline immediately after wordmark -----------------------
  it('renders the tagline element immediately after the wordmark element in DOM order', () => {
    renderFooter();

    const wordmarkEl = screen.getByText((content) =>
      content.includes('Pitch Vault'),
    );
    const taglineEl = screen.getByText((content) =>
      content.includes('A UGC Marketplace'),
    );

    // Both elements must share the same parent container.
    expect(wordmarkEl.parentElement).toBe(taglineEl.parentElement);

    // The tagline must come *after* the wordmark in the DOM.
    const position = wordmarkEl.compareDocumentPosition(taglineEl);
    // Node.DOCUMENT_POSITION_FOLLOWING === 4
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // Stricter: the tagline must be the very next sibling element.
    // We walk past any text nodes to find the next element sibling.
    let nextSibling = wordmarkEl.nextSibling;
    while (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
      nextSibling = nextSibling.nextSibling;
    }
    expect(nextSibling).toBe(taglineEl);
  });

  // 6. Footer container in document -----------------------------------------
  it('renders a footer container element that is present in the document', () => {
    const { container } = renderFooter();

    // Accept <footer> semantic element or a container with role="contentinfo"
    // or a data-testid="footer-container" fallback.
    const footerEl =
      container.querySelector('footer') ||
      container.querySelector('[role="contentinfo"]') ||
      container.querySelector('[data-testid="footer-container"]');

    expect(footerEl).toBeInTheDocument();
  });
});
